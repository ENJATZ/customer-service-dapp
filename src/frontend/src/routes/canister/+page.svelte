<script lang="ts">
	import { onMount } from 'svelte';
	import { useCanister, useConnect } from '@connect2ic/svelte';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { appStore } from '$lib/stores/app.store';
	import { updateQueryParamValue } from '$lib/utils/url.utils';
	import { QUERY_PARAM } from '$lib/constants/routes.constants';
	import { type Agent, Actor } from '@dfinity/agent';
	import { type Options } from '@dfinity/candid-ui';
	import { isMethodBlacklisted } from '$lib/utils/canister.utils';
	import { notificationStore } from '$lib/stores/notification.store';

	export let data: { canister: string | null | undefined };

	let askRender = false;
	let candidUiMethods: string[] | undefined;
	let showSelectedMethodOnly: boolean = true;
	let candidUiOptions: Options = {
		hideMethodsIdl: true,
		defaultValues: undefined
	};
	$: stringifiedOptions = JSON.stringify(candidUiOptions);

	const { canister: canisterId } = data;

	const agent = writable<Agent | undefined>(undefined);

	const [actor] = useCanister('main');
	const { isConnected } = useConnect();
	const { pushNotification } = notificationStore;

	appStore.subscribe((store) => {
		candidUiOptions.hideMethodsIdl = store.hideMethodsIdl;
		showSelectedMethodOnly = store.showSelectedMethodOnly;
		if (showSelectedMethodOnly && candidUiOptions?.defaultValues?.method) {
			candidUiMethods = [candidUiOptions.defaultValues.method];
		} else {
			candidUiMethods = undefined;
		}
		askRender = !askRender;
	});

	actor.subscribe((newActor: any) => {
		if (newActor && $isConnected) {
			const newAgent = Actor.agentOf(newActor.value);
			agent.set(newAgent);
		}
	});

	isConnected.subscribe((value: boolean) => {
		if (!value) {
			agent.set(undefined);
		}
	});

	onMount(() => {
		const defaultValuesFromUrl = JSON.parse(
			decodeURIComponent($page.url.searchParams.get(QUERY_PARAM.DEFAULT_VALUES) ?? '{}')
		);

		if (defaultValuesFromUrl.method) {
			if (!isMethodBlacklisted(defaultValuesFromUrl.method, canisterId)) {
				candidUiOptions.defaultValues = defaultValuesFromUrl;
			} else {
				pushNotification('error', 'The method you have provided in the URL is blacklisted!');
			}
		}

		const candidUiRef = document.querySelector('candid-ui');

		if (candidUiRef) {
			candidUiRef.addEventListener('ready', async () => {
				if (candidUiOptions.defaultValues) {
					const { method } = candidUiOptions.defaultValues || {};
					if (method) {
						if (showSelectedMethodOnly) candidUiMethods = [method];
						const defaultMethodContainer = candidUiRef?.shadowRoot?.querySelector(`li#${method}`);
						defaultMethodContainer?.scrollIntoView();
					}
				}
			});
			candidUiRef.addEventListener('filled', async (event: any) => {
				if (event.detail) {
					const { method } = event.detail;
					if (!isMethodBlacklisted(method, canisterId))
						updateQueryParamValue('defaultValues', event.detail);
				}
			});
		}
	});
</script>

<svelte:head>
	<title>{data.canister} • Customer service dApp</title>
</svelte:head>

<section class="candid-ui">
	{#key askRender}
		<candid-ui
			{canisterId}
			options={stringifiedOptions}
			agent={$agent}
			{...candidUiMethods ? { methods: candidUiMethods } : {}}
		/>
	{/key}
</section>

<style lang="scss">
	.candid-ui {
		height: calc(100% - 64px);
		overflow: hidden;
	}
</style>

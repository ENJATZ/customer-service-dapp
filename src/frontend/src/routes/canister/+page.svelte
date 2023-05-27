<script lang="ts">
	import { onMount } from 'svelte';
	import { useCanister, useConnect } from '@connect2ic/svelte';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { appStore } from '$lib/stores/app.store';
	import { updateQueryParamValue } from '$lib/utils/url.utils';
	import { type Agent, Actor } from '@dfinity/agent';
	import { type Options } from '@dfinity/candid-ui';

	export let data: { canister: string | null | undefined };
	export let candidUiMethods: string[] | undefined;
	export let showSelectedMethodOnly: boolean = true;
	export let candidUiOptions: Options = {
		hideMethodsIdl: true,
		defaultValues: undefined
	};
	$: stringifiedOptions = JSON.stringify(candidUiOptions);

	let askRender = false;
	const { canister: canisterId } = data;

	const agent = writable<Agent | undefined>(undefined);

	const [actor] = useCanister('main');
	const { isConnected } = useConnect();

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
		candidUiOptions.defaultValues = JSON.parse(
			decodeURIComponent($page.url.searchParams.get('defaultValues') ?? '{}')
		);

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
				console.log('🚀 ~ file: +page.svelte:51 ~ candidUiRef.addEventListener ~ event:', event);
				if (event.detail) updateQueryParamValue('defaultValues', event.detail);
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

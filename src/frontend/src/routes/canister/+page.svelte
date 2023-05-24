<script lang="ts">
	import { onMount } from 'svelte';
	import { useCanister, useConnect } from '@connect2ic/svelte';
	import { page } from '$app/stores';
	import { principalToText } from '$lib/utils/candid.utils';
	import { writable } from 'svelte/store';
	import { appStore } from '$lib/stores/app.store';
	import { type Agent, Actor } from '@dfinity/agent';
	import { type Options } from '@dfinity/candid-ui';

	export let data: { canister: string | null | undefined };
	export let candidUiOptions: Options = {
		hideMethodsIdl: true,
		defaultValues: undefined
	};
	export let candidUiMethods: string[] | undefined;

	const { canister: canisterId } = data;

	const agent = writable<Agent | undefined>(undefined);

	const [actor] = useCanister('main');
	const { isConnected } = useConnect();

	export let showSelectedMethodOnly: boolean = true;

	appStore.subscribe((store) => {
		console.log('🚀 ~ file: +page.svelte:28 ~ appStore.subscribe ~ store:', store);
		candidUiOptions.hideMethodsIdl = store.hideMethodsIdl;
		showSelectedMethodOnly = store.showSelectedMethodOnly;
	});

	actor.subscribe((newActor: any) => {
		if (newActor && $isConnected) {
			const newAgent = Actor.agentOf(newActor.value);
			agent.set(Actor.agentOf(newActor.value));
		}
	});

	isConnected.subscribe((value: boolean) => {
		if (!value) {
			agent.set(undefined);
		}
	});

	const updateUrlParams = (args: any) => {
		const parsedValues = JSON.stringify(principalToText(args));
		console.log('🚀 ~ file: +page.svelte:25 ~ updateUrlParams ~ parsedValues:', parsedValues);
		const urlParams = new URLSearchParams(window.location.search);

		urlParams.set('defaultValues', encodeURIComponent(parsedValues));
		const newUrl = window.location.pathname + '?' + urlParams.toString();
		history.pushState({ path: newUrl }, '', newUrl);
	};

	onMount(() => {
		candidUiOptions.defaultValues = JSON.parse(
			decodeURIComponent($page.url.searchParams.get('defaultValues') ?? '')
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
				if (event.detail) updateUrlParams(event.detail);
			});
		}
	});
</script>

<section class="candid-ui">
	<candid-ui
		{canisterId}
		options={JSON.stringify(candidUiOptions)}
		agent={$agent}
		methods={candidUiMethods}
	/>
</section>

<style lang="scss">
	.candid-ui {
		height: calc(100% - 64px);
		overflow: hidden;
	}
</style>

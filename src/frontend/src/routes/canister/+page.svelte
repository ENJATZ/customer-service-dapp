<script lang="ts">
	import { onMount } from 'svelte';
	import { useCanister, useConnect } from '@connect2ic/svelte';
	import { type Agent, Actor } from '@dfinity/agent';
	import { defineElement } from '@dfinity/candid-ui';

	import { page } from '$app/stores';
	import { principalToText } from '$lib/utils/candid.utils';
	import { writable } from 'svelte/store';

	export let data: { canister: string | null | undefined };
	export let defaultValues: any;

	const { canister: canisterId } = data;

	const agent = writable<Agent | undefined>(undefined);

	const [actor] = useCanister('main');
	const { isConnected } = useConnect();

	actor.subscribe((newActor: any) => {
		if (newActor && $isConnected) {
			agent.set(Actor.agentOf(newActor.value));
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
		defineElement();
		console.log('i am on mount');
		defaultValues = decodeURIComponent($page.url.searchParams.get('defaultValues') ?? '');

		const candidUiRef = document.querySelector('candid-ui');
		console.log('🚀 ~ file: +page.svelte:41 ~ onMount ~ candidUiRef:', candidUiRef);

		if (candidUiRef) {
			candidUiRef.addEventListener('ready', async () => {
				const { method } = JSON.parse(defaultValues) || {};
				if (method) {
					const defaultMethodContainer = candidUiRef?.shadowRoot?.querySelector(`li#${method}`);
					defaultMethodContainer?.scrollIntoView();
				}
			});
			candidUiRef.addEventListener('filled', async (event: any) => {
				console.log('🚀 ~ file: +page.svelte:51 ~ candidUiRef.addEventListener ~ event:', event);
				if (event.detail) updateUrlParams(event.detail);
			});
		}
	});
</script>

<div>
	<candid-ui {canisterId} {defaultValues} {agent} />
</div>

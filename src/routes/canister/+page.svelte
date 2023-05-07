<script lang="ts">
	import { onMount } from 'svelte';
	import { useCanister } from '@connect2ic/svelte';
	import { type Agent, Actor } from '@dfinity/agent';

	import { page } from '$app/stores';
	import { principalToText } from '$lib/utils/candid.utils';
	import { writable } from 'svelte/store';

	export let data: { canister: string | null | undefined };
	export let defaultValues: any;

	const { canister: canisterId } = data;

	const agent = writable<Agent | undefined>(undefined);

	const [actor] = useCanister('main');

	actor.subscribe((newActor: any) => {
		agent.set(Actor.agentOf(newActor.value));
	});

	const updateUrlParams = (args: any) => {
		const parsedValues = JSON.stringify(principalToText(args));
		const urlParams = new URLSearchParams(window.location.search);

		urlParams.set('defaultValues', encodeURIComponent(parsedValues));
		const newUrl = window.location.pathname + '?' + urlParams.toString();
		history.pushState({ path: newUrl }, '', newUrl);
	};

	onMount(() => {
		defaultValues = decodeURIComponent($page.url.searchParams.get('defaultValues') ?? '');

		const candidUiRef = document.querySelector('candid-ui');

		if (candidUiRef) {
			candidUiRef.addEventListener('ready', async (event) => {});
			candidUiRef.addEventListener('filled', async (event: any) => {
				if (event.detail) updateUrlParams(event.detail);
			});
		}
	});
</script>

<div>
	<candid-ui {canisterId} {defaultValues} {agent} />
</div>

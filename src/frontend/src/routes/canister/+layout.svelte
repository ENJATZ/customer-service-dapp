<script lang="ts">
	import { onMount } from 'svelte';
	import { Connect2ICProvider } from '@connect2ic/svelte';
	import NavBar from '$lib/components/header/nav-bar.svelte';
	import { createClient } from '@connect2ic/core';
	import { defaultProviders } from '@connect2ic/core/providers';

	export let data: { canister: string | undefined; idlFactory: any | undefined };
	const { canister: canisterId, idlFactory } = data;

	const authClient =
		canisterId && idlFactory
			? createClient({
					canisters: {
						main: {
							canisterId,
							idlFactory
						}
					},
					providers: defaultProviders,
					globalProviderConfig: {
						host: 'https://boundary.ic0.app',
						dev: false,
						whitelist: [canisterId]
					}
			  })
			: undefined;

	// Dirty, I know, ref: https://github.com/pablo-abc/felte/issues/223
	let mounted = false;
	onMount(async () => {
		mounted = true;
	});
</script>

{#if authClient && mounted}
	<Connect2ICProvider client={authClient}>
		<NavBar />
		<slot />
	</Connect2ICProvider>
{:else}
	loading...
{/if}

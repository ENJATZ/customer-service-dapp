<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { useConnect } from '@connect2ic/svelte';

	// import SignInCanisters from "$lib/pages/SignInCanisters.svelte";
	// import { isSignedIn } from "$lib/utils/auth.utils";
	// import { authStore } from "$lib/stores/auth.store";
	// import CanisterDetail from "$lib/pages/CanisterDetail.svelte";
	let signedIn = false;
	// $: signedIn = isSignedIn($authStore.identity);

	// Preloaded by +page.ts
	export let data: { canister: string | null | undefined };

	const { canister: canisterId } = data;
	const { principal } = useConnect();
	console.log('🚀 ~ file: +page.svelte:18 ~ principal:', principal);
	onMount(() => {
		const candidUiRef = document.querySelector('candid-ui');

		if (candidUiRef) {
			candidUiRef.addEventListener('ready', async (event) => {});
		}
	});
</script>

<div>
	{$principal}
	<candid-ui {canisterId} />
</div>

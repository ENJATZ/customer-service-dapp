<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ConnectButton, ConnectDialog, useConnect } from '@connect2ic/svelte';
	import EraseIcon from '$lib/components/icons/erase-icon.svelte';
	import '@connect2ic/core/style.css';


	const handleClearLink = () => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		urlSearchParams.delete('defaultValues');
		const newUrl = `${window.location.origin}${
			window.location.pathname
		}?${urlSearchParams.toString()}`;
		window.location.href = newUrl;
	};
	const { principal } = useConnect();
</script>

<div class="navbar">
	<div class="navbar__logo" />
	<div class="navbar__auth">
		{#if $principal}
			<div class="navbar__principal">
				<span class="navbar__principal__text">{$principal}</span>
			</div>
		{/if}
		<ConnectButton />
		<ConnectDialog />
		<div class="navbar__clear" on:click={handleClearLink}>
			<EraseIcon />
		</div>
	</div>
</div>

<style lang="scss">
	.navbar {
		display: flex;
		border-bottom: 1px solid;
		padding: 0.5rem;
		justify-content: space-between;
	}
	.navbar__logo {
		font-size: 32px;
		font-weight: 700;
	}
	.navbar__auth {
		display: flex;
		gap: 0.3rem;
		align-self: flex-end;
	}
	.navbar__principal {
		align-items: center;
		background: #7dbd918c;
		border-radius: 2rem;
		display: flex;
		padding: 10px 20px;
	}

	.navbar__principal__text {
		font-size: 18px;
		max-width: 200px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.navbar__clear {
		background: rgb(35 35 39);
		padding: 10px 20px;
		border-radius: 2rem;
		cursor: pointer;

		&:hover {
			transform: scale(1.03);
			transition: all 0.4s;
		}
	}
</style>

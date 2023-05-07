<script lang="ts">
	import { ConnectButton, ConnectDialog, useConnect } from '@connect2ic/svelte';
	import '@connect2ic/core/style.css';

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
	</div>
</div>

<style>
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
</style>

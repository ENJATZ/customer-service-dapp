<script lang="ts">
	import type { NotificationKind } from '$lib/stores/notification.store';
	import ValidIcon from '$lib/components/icons/valid-icon.svelte';
	import InvalidIcon from '$lib/components/icons/invalid-icon.svelte';
	import InfoIcon from '$lib/components/icons/info-icon.svelte';

	export let kind: NotificationKind;
	export let message: string;
</script>

<div class="passive-notification">
	{#if kind == 'success'}
		<ValidIcon />
	{:else if kind == 'warning'}
		<InfoIcon />
	{:else if kind == 'error'}
		<InvalidIcon />
	{/if}
	{message}
</div>

<style lang="scss">
	.passive-notification {
		background: rgb(62, 62, 62);
		border-radius: 4px;
		box-shadow: 1px 1px 1px #ddd;
		color: rgb(219, 219, 219);
		font-family: 'Arial';
		gap: 0.3rem;
		padding: 1rem;
		display: flex;

		& :global(svg) {
			height: 1.25rem;
			margin-right: 0.3rem;
			width: 1.25rem;
		}
	}
</style>

<script lang="ts">
	import EmptyCircle from '../icons/empty-circle.svelte';
	import CheckedCircle from '../icons/checked-circle.svelte';
	export let isCheckItem: boolean = false;
	export let isChecked: boolean = false;
	export let handleClick: any;

	const onClick = () => {
		if (isCheckItem) {
			handleClick(!isChecked);
		} else {
			handleClick();
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="item" on:click={onClick}>
	{#if isCheckItem}
		{#if isChecked}
			<div class="checked-circle">
				<CheckedCircle />
			</div>
		{:else}
			<EmptyCircle />
		{/if}
		<slot />
	{:else}
		<slot name="icon" />
		<slot />
	{/if}
</div>

<style lang="scss">
	.div {
		margin: 0;
	}

	.item {
		padding: 0.5rem;
		cursor: pointer;

		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #fff;

		& :global(svg) {
			width: 24px;
			height: 24px;

			& :global(path) {
				fill: #fff;
			}
		}

		&:hover {
			background-color: #333333;
		}

		.checked-circle {
			width: 24px;
			height: 24px;

			& :global(path) {
				fill: green;
			}
		}
	}
</style>

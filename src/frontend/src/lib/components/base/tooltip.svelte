<script lang="ts">
	export let title = '';
	let isHovered = false;
	let x: number | undefined;
	let y: number | undefined;

	const mouseOver = (event: MouseEvent) => {
		isHovered = true;
		x = event.pageX + 5;
		y = event.pageY + 10;
	};
	const mouseMove = (event: MouseEvent) => {
		x = event.pageX + 5;
		y = event.pageY + 10;
	};
	const mouseLeave = () => {
		isHovered = false;
	};
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div on:mouseover={mouseOver} on:mouseleave={mouseLeave} on:mousemove={mouseMove}>
	<slot />
</div>

{#if isHovered}
	<div style="top: {y}px; left: {x}px;" class="tooltip">{title}</div>
{/if}

<style>
	.tooltip {
		background: rgb(62, 62, 62);
		border-radius: 4px;
		box-shadow: 1px 1px 1px #ddd;
		color: rgb(219, 219, 219);
		font-family: 'Arial';
		padding: 1rem;
		position: absolute;
		width: 350px;
	}
</style>

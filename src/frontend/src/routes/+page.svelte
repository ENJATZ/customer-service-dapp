<script lang="ts">
	import { onMount } from 'svelte';
	import { isValidCanisterId } from '$lib/utils/canister.utils';
	import ValidIcon from '$lib/components/icons/valid-icon.svelte';
	import InvalidIcon from '$lib/components/icons/invalid-icon.svelte';
	import GoToIcon from '$lib/components/icons/go-to-icon.svelte';
	import InfoIcon from '$lib/components/icons/info-icon.svelte';
	import Tooltip from '$lib/components/base/tooltip.svelte';

	let inputValue = '';
	let isValid: boolean | undefined = undefined;

	const validateInput = () => {
		isValid = isValidCanisterId(inputValue);
	};

	const redirect = () => {
		if (isValid) {
			window.location.href = `/canister?canisterId=${inputValue}`;
		}
	};

	onMount(validateInput);
</script>

<main>
	<div class="form">
		<img class="form__logo" src="logo.png" alt="ICP logo" />
		<div class="form__input">
			<input
				type="text"
				placeholder="Fill the canister id.."
				bind:value={inputValue}
				on:input={validateInput}
			/>
			<Tooltip
				title="Fill in a valid canister id, a valid format looks like this: rrkah-fqaaa-aaaaa-aaaaq-cai."
			>
				{#if inputValue.length}
					{#if isValid}
						<ValidIcon />
					{:else}
						<InvalidIcon />
					{/if}
				{:else}
					<InfoIcon />
				{/if}
			</Tooltip>
		</div>
		<div class="form__button" on:click={redirect}><GoToIcon />Go to form</div>
	</div>
</main>

<svelte:head>
	<title>Home Page • Customer service dApp</title>
</svelte:head>

<style lang="scss">
	.form {
		align-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		height: 100vh;
		justify-content: center;
	}

	.form__logo {
		width: 200px;
		margin-bottom: 1rem;
	}

	.form__input {
		width: 350px;
		display: flex;
		align-items: center;

		& :global(svg) {
			margin-left: 0.25rem;
			width: 1.25rem;
			height: 1.25rem;
		}
	}

	input {
		width: 100%;
		margin: 1rem 0;
		display: inline-block;
		border: 1px solid #ccc;
		box-shadow: inset 0 1px 3px #ddd;
		border-radius: 4px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		padding-left: 20px;
		padding-right: 20px;
		padding-top: 12px;
		padding-bottom: 12px;
	}

	.form__button {
		font-family: 'Arial';
		align-items: center;
		background: rgb(35 35 39);
		border-radius: 2rem;
		color: #fff;
		cursor: pointer;
		display: flex;
		gap: 0.5rem;
		padding: 10px 20px;
		width: fit-content;

		& :global(svg) {
			width: 1rem;
			height: 1rem;

			& :global(path) {
				fill: #fff;
			}
		}

		&:hover {
			transform: scale(1.03);
			transition: all 0.4s;
		}
	}
</style>

<script lang="ts">
	import EraseIcon from '$lib/components/icons/erase-icon.svelte';
	import CogIcon from '$lib/components/icons/cog-icon.svelte';
	import EyeIcon from '$lib/components/icons/eye-icon.svelte';
	import ShareIcon from '$lib/components/icons/share-icon.svelte';
	import DropdownItem from './dropdown-item.svelte';
	import { ConnectButton, ConnectDialog, useConnect } from '@connect2ic/svelte';
	import { appStore } from '$lib/stores/app.store';
	import { QUERY_PARAM } from '$lib/constants/routes.constants';
	import { updateQueryParamValue } from '$lib/utils/url.utils';
	import '@connect2ic/core/style.css';

	const { principal } = useConnect();
	const { setHideMethodsIdl, setShowSelectedMethodOnly } = appStore;

	let hideMethodsIdl: boolean = true,
		showSelectedMethodOnly: boolean = true;

	appStore.subscribe((value) => {
		hideMethodsIdl = value.hideMethodsIdl;
		showSelectedMethodOnly = value.showSelectedMethodOnly;
	});

	const handleClearLink = () => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		urlSearchParams.delete(QUERY_PARAM.DEFAULT_VALUES);
		const newUrl = `${window.location.origin}${
			window.location.pathname
		}?${urlSearchParams.toString()}`;
		window.location.href = newUrl;
	};

	const handleShareForm = async () => {
		const tabUrl = window.location.href;

		try {
			await navigator.clipboard.writeText(tabUrl);
			alert('Copied to clipboard; TODO: Make this nice!');
			console.log('Tab link copied to clipboard:', tabUrl);
		} catch (error) {
			console.error('Failed to copy tab link to clipboard:', error);
		}
	};

	const handleHideMethodsIdl = (value: boolean) => {
		setHideMethodsIdl(value);
		updateQueryParamValue(QUERY_PARAM.HIDE_METHODS_IDL, value);
	};

	const handleShowSelectedMethodOnly = (value: boolean) => {
		setShowSelectedMethodOnly(value);
		updateQueryParamValue(QUERY_PARAM.SHOW_SELECTED_METHOD_ONLY, value);
	};
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
		<div class="navbar__dropdown">
			<div class="navbar__dropdown__button">
				<CogIcon />Options
			</div>
			<div class="navbar__dropdown__content">
				<DropdownItem
					isCheckItem={true}
					isChecked={hideMethodsIdl}
					handleClick={handleHideMethodsIdl}
				>
					<EyeIcon slot="icon" />Hide methods IDL
				</DropdownItem>
				<DropdownItem
					isCheckItem={true}
					isChecked={showSelectedMethodOnly}
					handleClick={handleShowSelectedMethodOnly}
				>
					<EyeIcon slot="icon" />Show selected method only
				</DropdownItem>
				<hr />
				<DropdownItem handleClick={handleClearLink}>
					<EraseIcon slot="icon" />Clear form
				</DropdownItem>
				<DropdownItem handleClick={handleShareForm}>
					<ShareIcon slot="icon" />Share form
				</DropdownItem>
			</div>
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
	.navbar__dropdown {
		font-family: 'Arial';
		position: relative;
	}
	.navbar__dropdown__button {
		background: rgb(35 35 39);
		padding: 10px 20px;
		border-radius: 2rem;
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
			transform: scale(1.03);
			transition: all 0.4s;
		}
	}
	.navbar__dropdown__content {
		background-color: rgb(35 35 39);
		border-radius: 4px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		color: #fff;
		display: none;
		padding: 0.5rem;
		position: absolute;
		right: 0;
		top: 105%;
		width: 250px;
		z-index: 3;

		& hr {
			height: 1.2px;
			background-color: #383838;
			border: none;
		}
	}
	.navbar__dropdown:hover .navbar__dropdown__content {
		display: block;
	}
</style>

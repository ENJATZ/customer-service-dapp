import { getQueryParamValue } from '$lib/utils/url.utils';
import type { Readable } from 'svelte/store';
import { writable } from 'svelte/store';

export interface AppStoreData {
	hideMethodsIdl: boolean;
	showSelectedMethodOnly: boolean;
}

export interface AppStore extends Readable<AppStoreData> {
	setHideMethodsIdl: (value: boolean) => Promise<void>;
	setShowSelectedMethodOnly: (value: boolean) => Promise<void>;
}

const initAuthStore = (): AppStore => {
	const valuesFromUrl = {
		hideMethodsIdl: getQueryParamValue('hideMethodsIdl'),
		showSelectedMethodOnly: getQueryParamValue('showSelectedMethodOnly')
	};
	const { subscribe, update } = writable<AppStoreData>({
		hideMethodsIdl: valuesFromUrl.hideMethodsIdl ? Boolean(valuesFromUrl.hideMethodsIdl) : true,
		showSelectedMethodOnly: valuesFromUrl.showSelectedMethodOnly
			? Boolean(valuesFromUrl.showSelectedMethodOnly)
			: true
	});

	return {
		subscribe,
		setHideMethodsIdl: async (value: boolean) => {
			update((state: AppStoreData) => ({
				...state,
				hideMethodsIdl: value
			}));
		},

		setShowSelectedMethodOnly: async (value: boolean) => {
			update((state: AppStoreData) => ({
				...state,
				showSelectedMethodOnly: value
			}));
		}
	};
};

export const appStore = initAuthStore();

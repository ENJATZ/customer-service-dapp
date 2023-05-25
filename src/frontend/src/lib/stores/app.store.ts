import { QUERY_PARAM } from '$lib/constants/routes.constants';
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
		hideMethodsIdl: getQueryParamValue(QUERY_PARAM.HIDE_METHODS_IDL),
		showSelectedMethodOnly: getQueryParamValue(QUERY_PARAM.SHOW_SELECTED_METHOD_ONLY)
	};
	const { subscribe, update } = writable<AppStoreData>({
		hideMethodsIdl: valuesFromUrl.hideMethodsIdl ? valuesFromUrl.hideMethodsIdl === 'true' : true,
		showSelectedMethodOnly: valuesFromUrl.showSelectedMethodOnly
			? valuesFromUrl.showSelectedMethodOnly === 'true'
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

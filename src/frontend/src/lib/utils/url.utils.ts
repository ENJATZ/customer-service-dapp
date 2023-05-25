import { principalToText } from './candid.utils';

export const getQueryParamValue = (param: string): string | null => {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(param);
};

export const updateQueryParamValue = (name: string, args: any) => {
	const parsedValues = JSON.stringify(principalToText(args));
	const urlParams = new URLSearchParams(window.location.search);

	urlParams.set(name, encodeURIComponent(parsedValues));
	const newUrl = window.location.pathname + '?' + urlParams.toString();
	history.pushState({ path: newUrl }, '', newUrl);
};

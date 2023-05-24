export const getQueryParamValue = (param: string): string | null => {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(param);
};

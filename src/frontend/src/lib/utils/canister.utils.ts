export const CANISTER_REGEX_PATTERN =
	/^[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{3}$/;

export const METHODS_BLACKLIST: { [key: string]: string[] } = {
	'*': ['transfer_ownership'],
	'rrkah-fqaaa-aaaaa-aaaaq-cai': ['claim_gtc_neurons', 'claim_or_refresh_neuron_from_account']
};

export const isValidCanisterId = (canisterId: string): boolean =>
	CANISTER_REGEX_PATTERN.test(canisterId);

export const isMethodBlacklisted = (method: string, canisterId?: string | null) => {
	if (METHODS_BLACKLIST['*'].indexOf(method) !== -1) return true;
	if (canisterId && canisterId in METHODS_BLACKLIST) {
		if (METHODS_BLACKLIST[canisterId]?.indexOf(method) !== -1) {
			return true;
		}
	}
	return false;
};

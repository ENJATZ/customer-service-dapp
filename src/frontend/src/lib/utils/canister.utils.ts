export const CANISTER_REGEX_PATTERN =
	/^[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{3}$/;

export const isValidCanisterId = (canisterId: string): boolean =>
	CANISTER_REGEX_PATTERN.test(canisterId);

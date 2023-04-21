import { browser } from '$app/environment';
import { CANISTER_PARAM } from '$lib/constants/routes.constants';
import { Principal } from '@dfinity/principal';
import { error, type LoadEvent } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { isValidCanisterId } from '$lib/utils/canister.utils';
import { getRemoteDidJs } from '$lib/services/candid.service';

export const load: PageLoad = async ($event: LoadEvent): Promise<LayoutLoad> => {
	if (!browser) {
		return {
			canister: undefined,
			idlFactory: undefined
		};
	}

	const {
		url: { searchParams }
	} = $event;

	const canisterId = searchParams?.get(CANISTER_PARAM);
	if (!canisterId || !isValidCanisterId(canisterId)) {
		throw error(500, {
			message: 'Provided canisterId is not valid'
		});
	}

	const canisterPrincipal = Principal.fromText(canisterId);
	const idlFactory = await getRemoteDidJs(canisterPrincipal);

	return {
		canister: canisterId,
		idlFactory
	};
};

export type LayoutLoad = {
	canister: string | null | undefined;
	idlFactory: any | undefined;
};

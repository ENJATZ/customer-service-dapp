import { cleanDidFile } from '$lib/utils/candid.utils';
import { Actor, HttpAgent, type ActorSubclass } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

const agent = new HttpAgent({
	host: 'https://boundary.ic0.app/'
});

export const getRemoteDidJs = async (canisterId: Principal) => {
	const common_interface: IDL.InterfaceFactory = ({ IDL }) =>
		IDL.Service({
			__get_candid_interface_tmp_hack: IDL.Func([], [IDL.Text], ['query'])
		});
	const actor: ActorSubclass = Actor.createActor(common_interface, { agent, canisterId });
	const candid_source = (await actor.__get_candid_interface_tmp_hack()) as string;
	return didToJs(candid_source);
};

export const didToJs = async (candid_source: string) => {
	// TODO: Extract the canisterId from the url
	// using a hard-coded candid ui canister for now
	const canisterId = Principal.fromText('a4gq6-oaaaa-aaaab-qaa4q-cai');
	const didjs_interface: IDL.InterfaceFactory = ({ IDL }) =>
		IDL.Service({
			did_to_js: IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], ['query'])
		});
	const didjs: ActorSubclass = Actor.createActor(didjs_interface, { agent, canisterId });
	const js: any = await didjs.did_to_js(candid_source);

	if (!Array.isArray(js) || !js?.length) {
		return undefined;
	}
	return cleanDidFile(js[0]);
};

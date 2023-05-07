import { Principal } from '@dfinity/principal';

export const cleanDidFile = async (rawDid: string) => {
	return eval(
		rawDid
			.replace(/export default/g, '')
			.replace(/export const idlFactory =/g, '')
			.replace(/export/g, '')
	);
};

export const principalToText = (config: any) => {
	if (typeof config !== 'object') {
		return config;
	}
	for (const p in config) {
		if (config[p]._isPrincipal) {
			const uint8Array = new Uint8Array(Object.values(config[p]._arr));
			config[p] = Principal.fromUint8Array(uint8Array).toText();
		} else if (typeof config[p] === 'object') {
			config[p] = principalToText(config[p]);
		}
	}
	return config;
};

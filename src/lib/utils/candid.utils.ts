export const cleanDidFile = async (rawDid: string) => {
	return eval(
		rawDid
			.replace(/export default/g, '')
			.replace(/export const idlFactory =/g, '')
			.replace(/export/g, '')
	);
};

import type { Principal } from '@dfinity/principal';
import type { HttpAgent } from '@dfinity/agent';
import type { Readable } from 'svelte/store';
import { writable } from 'svelte/store';
// Might not need this whole store
export interface AuthStoreData {
	agent: HttpAgent | undefined | null;
	principal: Principal | undefined;
}

export interface AuthStore extends Readable<AuthStoreData> {
	setAuth: (principal: Principal, agent: HttpAgent) => Promise<void>;
	signOut: () => Promise<void>;
}

const initAuthStore = (): AuthStore => {
	const { subscribe, set, update } = writable<AuthStoreData>({
		agent: undefined,
		principal: undefined
	});

	return {
		subscribe,
		setAuth: async (principal: Principal, agent: HttpAgent) => {
			set({
				principal,
				agent
			});
		},

		signOut: async () => {
			update((state: AuthStoreData) => ({
				...state,
				agent: undefined,
				principal: undefined
			}));
		}
	};
};

export const authStore = initAuthStore();

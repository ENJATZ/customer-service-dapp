import { PASSIVE_NOTIFICATION_TIMEOUT } from '$lib/constants/notifications.constants';
import { generateRandomId } from '$lib/utils/random.utils';
import type { Readable } from 'svelte/store';
import { writable } from 'svelte/store';

export type NotificationKind = 'error' | 'success' | 'warning';

export interface Notification {
	id: string;
	kind: 'error' | 'success' | 'warning';
	message: string;
}
export interface NotificationStoreData {
	passiveNotifications: Notification[];
}

export interface NotificationStore extends Readable<NotificationStoreData> {
	pushNotification: (kind: NotificationKind, message: string) => void;
}

const initNotificationStore = (): NotificationStore => {
	const { subscribe, update } = writable<NotificationStoreData>({
		passiveNotifications: []
	});

	return {
		subscribe,
		pushNotification: (kind: NotificationKind, message: string) => {
			const notificationId = generateRandomId();
			update((state: NotificationStoreData) => ({
				...state,
				passiveNotifications: [
					...state.passiveNotifications,
					{
						id: notificationId,
						kind,
						message
					}
				]
			}));
			setTimeout(() => {
				update((state: NotificationStoreData) => ({
					...state,
					passiveNotifications: state.passiveNotifications.filter(({ id }) => id !== notificationId)
				}));
			}, PASSIVE_NOTIFICATION_TIMEOUT);
		}
	};
};

export const notificationStore = initNotificationStore();

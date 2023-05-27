<script lang="ts">
	import { notificationStore, type Notification } from '$lib/stores/notification.store';
	import PassiveNotification from './passive-notification.svelte';

	let passiveNotifications: Notification[] = [];

	notificationStore.subscribe((store) => {
		passiveNotifications = store.passiveNotifications;
	});
</script>

<div class="notifications">
	{#each passiveNotifications as notification}
		<PassiveNotification kind={notification.kind} message={notification.message} />
	{/each}
</div>

<style lang="scss">
	.notifications {
		bottom: 1.25rem;
		display: flex;
		flex-direction: column;
		left: 1.25rem;
		position: fixed;
		z-index: 5;
		gap: 0.25rem;
	}
</style>

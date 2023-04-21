<script lang="ts">
	import { ConnectButton, ConnectDialog, useConnect, useCanister } from '@connect2ic/svelte';
	import '@connect2ic/core/style.css';

	const [actor] = useCanister('main');
</script>

<div>
	<ConnectButton />
	<ConnectDialog />
</div>

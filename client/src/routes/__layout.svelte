<script>
	import '../app.css';
	import Notifications from 'svelte-notifications';
</script>

<Notifications>
	<main>
		<slot />
	</main>
</Notifications>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<script context="module">
	export const prerender = true;
</script>

<script>
	import logo from "./../assets/img/logo.svg";

	const goRegister = () => {
		window.location = "/register";
	};

	const goLgoin = () => {
		window.location = "/login";
	};
</script>

<svelte:head>
	<title>Quarashi-Home</title>
	<meta name="description" content="Quarashi Chat Home" />
</svelte:head>

<div class="index">
	<div class="index_box">
		<div class="logo">
			<img src={logo} alt="logo" />
		</div>
		<h1>Quarashi</h1>
		<p>You Control Your Data</p>
		<div class="button_groups">
			<div>
				<button class="btn btn-secondary secondary_button"
					>Private</button
				>
				<button class="btn btn-secondary secondary_button"
					>Anonymous</button
				>
			</div>
			<div>
				<button class="btn btn-secondary secondary_button"
					>E2E Encrypted</button
				>
				<button class="btn btn-secondary secondary_button"
					>No Trackers</button
				>
			</div>
		</div>
		<div class="auth_buttons">
			<button class="btn btn-primary secondary_button" on:click={goLgoin}
				>Login</button
			>
			<button
				class="btn btn-danger secondary_button"
				on:click={goRegister}>Register</button
			>
		</div>
		<div class="contact">
			<p>Need Help?&nbsp; <a href="/login">Contact Us</a></p>
		</div>
	</div>
</div>

<style>
	.index {
		display: flex;
		height: 100vh;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.index_box {
		width: 465px;
		max-height: 100%;
		background-color: var(--main_back_color);
		border-radius: 12px;
	}
	.logo {
		display: flex;
		justify-content: center;
		margin-top: 130px;
	}
	.logo img {
		background-color: var(--logo_color);
		border-radius: 50%;
		width: 100px;
		height: 100px;
	}
	.index_box h1 {
		text-transform: uppercase;
		font-size: 18px;
		font-weight: bolder;
		margin-top: 20px;
	}
	.index_box p {
		text-align: center;
		color: var(--text-color);
	}
	.button_groups {
		margin-top: 20px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.button_groups .secondary_button {
		width: 140px;
		height: 38px;
		background-color: var(--second_back_color);
		margin-top: 8px;
		border-radius: 19px;
		font-size: 12px;
		color: var(--text-color);
		border: none;
	}

	.auth_buttons {
		margin-top: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.auth_buttons button {
		margin: 15px;
		width: 200px;
		height: 40px;
		border-radius: 12px;
		font-size: 12px;
	}
	.auth_buttons .btn-primary {
		background-color: var(--primary-color);
	}
	.auth_buttons .btn-danger {
		background-color: var(--danger-color);
	}
	.contact {
		margin-top: 100px;
		margin-bottom: 40px;
	}

	@media (max-height: 768px) {
		.logo {
			margin-top: 40px;
		}
	}
	@media (max-height: 686px) {
		.index {
			height: 100%;
			padding-top: 20px;
            padding-bottom: 20px;
		}
	}
</style>

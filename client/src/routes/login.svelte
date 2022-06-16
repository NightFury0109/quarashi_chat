<script context="module">
	export const prerender = true;
</script>

<script>
	import { onMount } from "svelte";
	import { getNotificationsContext } from "svelte-notifications";

	import logo from "./../assets/img/logo.svg";
	import { login } from "./../api/auth/login";

	const { addNotification } = getNotificationsContext();
	let username, password;

	// onMount(() => {
	// 	if (typeof localStorage !== "undefined") {
	// 		let token = localStorage.getItem("user_token");
	// 		if (token) {
	// 			window.location = "/chat";
	// 		}
	// 	}
	// });

	const goChat = () => {
		if (!password || !username) {
			addNotification({
				position: "top-center",
				removeAfter: 3000,
				text: "Fill the all item!",
				type: "danger",
			});
		} else {
			let result = login({ username: username, password: password });
			switch (result) {
				case 0:
					addNotification({
						position: "top-center",
						removeAfter: 3000,
						text: "Login is failed!",
						type: "danger",
					});
					break;
				case 1:
					addNotification({
						position: "top-center",
						removeAfter: 3000,
						text: "Login success!",
						type: "success",
					});
					window.location = "/chat";
					break;
				case 2:
					addNotification({
						position: "top-center",
						removeAfter: 3000,
						text: "Register the account",
						type: "danger",
					});
					window.location = "/register";
					break;
			}
		}
	};
</script>

<svelte:head>
	<title>Quarashi-Login</title>
	<meta name="description" content="Quarashi Chat Login" />
</svelte:head>

<div class="login">
	<div class="login_box">
		<div class="logo">
			<img src={logo} alt="logo" />
		</div>
		<h1>Quarashi</h1>
		<p>Welcome Back To Quarashi VPN</p>
		<div class="input_field">
			<div>
				<p>Username</p>
				<input
					class="form-control"
					placeholder="Enter Username"
					bind:value={username}
				/>
			</div>
			<div>
				<p>Password</p>
				<input
					class="form-control"
					placeholder="Enter Password"
					type="password"
					bind:value={password}
				/>
			</div>
			<button class="btn btn-primary form-control" on:click={goChat}
				>Login</button
			>
		</div>
	</div>
</div>

<style>
	.login {
		display: flex;
		height: 100vh;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.login_box {
		width: 465px;
		max-height: 100%;
		background-color: var(--main_back_color);
		border-radius: 12px;
		padding-left: 20px;
		padding-right: 20px;
	}
	.logo {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
	.logo img {
		background-color: var(--logo_color);
		border-radius: 50%;
		width: 100px;
		height: 100px;
	}
	.login_box h1 {
		text-transform: uppercase;
		font-size: 18px;
		font-weight: bolder;
		margin-top: 20px;
	}
	.login_box p {
		text-align: center;
		color: var(--text-color);
	}

	.input_field {
		margin-top: 40px;
	}
	.input_field p {
		text-align: left;
	}
	.input_field input {
		margin-top: 12px;
		margin-bottom: 20px;
		background-color: var(--background_color);
		border-color: var(--second_back_color);
		border-radius: 12px;
		height: 57px;
		color: white;
	}

	.btn.btn-primary.form-control {
		margin-top: 80px;
		margin-bottom: 20px;
		border-radius: 12px;
		font-size: 12px;
		height: 48px;
	}

	@media (max-height: 615px) {
		.login {
			height: 100%;
		}
	}
</style>

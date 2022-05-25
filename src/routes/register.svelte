<script context="module">
    export const prerender = true;
</script>

<script>
    import logo from "./../assets/img/logo.svg";
    import { register } from "./../api/auth/register";

    import { getNotificationsContext } from "svelte-notifications";

    const { addNotification } = getNotificationsContext();

    let checked = false;
    let username, password, repassword;

    const goLogin = () => {
        if (!password || !repassword || !username) {
            addNotification({
                position: "top-center",
                removeAfter: 3000,
                text: "Fill the all item!",
                type: "danger",
            });
        } else if (password != repassword) {
            addNotification({
                position: "top-center",
                removeAfter: 3000,
                text: "Password is different!",
                type: "danger",
            });
        } else {
            let result = register({ username: username, password: password });
            if (result) {
                addNotification({
                    position: "top-center",
                    removeAfter: 3000,
                    text: "Successfully registered!",
                    type: "success",
                });
                window.location = "/login";
            }
        }
    };
</script>

<svelte:head>
    <title>Quarashi-Register</title>
    <meta name="description" content="Quarashi Chat Register" />
</svelte:head>

<div class="register">
    <div class="register_box">
        <div class="logo">
            <img src={logo} alt="logo" />
        </div>
        <h1>Quarashi chat</h1>
        <p>You Control Your Data</p>
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
            <div>
                <p>Confirm Password</p>
                <input
                    class="form-control"
                    placeholder="Enter Password"
                    type="password"
                    bind:value={repassword}
                />
            </div>
        </div>
        <p class="des">
            Don’t forget your password. It can not be reset. We recommend you to
            store it somewhere safe.
        </p>
        <div class="privacy">
            <input type="checkbox" bind:checked />
            <span>I agree to the Terms & Conditions and Privacy Policy</span>
        </div>
        <button
            class="btn btn-primary form-control"
            on:click={goLogin}
            disabled={!checked}>Register</button
        >
    </div>
</div>

<style>
    .register {
        display: flex;
        height: 100vh;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .register_box {
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
        margin-top: 30px;
    }
    .logo img {
        background-color: var(--logo_color);
        border-radius: 50%;
        width: 100px;
        height: 100px;
    }
    .register_box h1 {
        text-transform: uppercase;
        font-size: 18px;
        margin-bottom: 0px;
        margin-top: 20px;
        font-weight: bolder;
    }
    .register_box p {
        text-align: center;
        margin-top: 0px;
        color: var(--text-color);
    }

    .input_field {
        margin-top: 40px;
    }
    .input_field p {
        text-align: left;
        color: var(--text-color);
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
    p.des {
        text-align: left;
    }

    .privacy {
        margin-top: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .privacy span {
        font-size: 12px;
        margin-left: 7px;
        color: var(--text-color);
    }
    .privacy input[type="checkbox"] {
        width: 22px;
        height: 22px;
        border-radius: 50%;
    }

    .btn.btn-primary.form-control {
        margin-top: 20px;
        margin-bottom: 20px;
        border-radius: 12px;
        font-size: 12px;
        height: 48px;
    }
</style>

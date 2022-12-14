<script context="module">
    export const prerender = true;
</script>

<script>
    import {
        UserPlusIcon,
        LogOutIcon,
        LockIcon,
        SettingsIcon,
    } from "svelte-feather-icons";
    import LZString from "lz-string";

    import ChatArea from "$lib/components/chat/ChatArea.svelte";
    import Setting from "$lib/components/setting/Setting.svelte";
    import { connectSocket, connectRTC } from "./../api/webrtc";
    import { getUser } from "./../api/user/getUser";
    import isEmpty from "../utils/is-empty";

    import avatar from "./../assets/img/avatar/avatar_em.png";
    // import avatar from "./../assets/img/avatar/avatar.png";
    import search_logo from "./../assets/img/search.svg";
    import { onMount } from "svelte";

    let compress = LZString.compress;
    let decompress = LZString.decompress;

    let room = "",
        secure = {},
        setting = false,
        userData,
        search;

    $: setInterval(() => {
        if (typeof localStorage !== "undefined") {
            secure = localStorage.getItem("private")
                ? JSON.parse(decompress(localStorage.getItem("private")))
                : {};
        }
    });

    $: if (typeof localStorage !== "undefined") {
        if (isEmpty(localStorage.getItem("user_token"))) {
            window.location = "/login";
        } else {
            userData = JSON.parse(
                LZString.decompress(localStorage.getItem("user_token"))
            );
        }
    }
    onMount(() => {
        connectRTC();
    });

    const logout = () => {
        if (typeof localStorage !== "undefined") {
            localStorage.removeItem("user_token");
            window.location = "/login";
        }
    };

    const connectWRTC = (roomID, e) => {
        setting = false;
        e.target.classList.add("active");
        connectSocket();
        room = roomID;
    };

    const goSetting = () => {
        if (!setting) {
            setting = true;
        } else {
            setting = false;
        }
    };

    const getOnineUser = () => {
        let data = getUser(search);
    };
</script>

<svelte:head>
    <title>Quarashi-Chat</title>
    <meta name="description" content="Quarashi Chat" />
</svelte:head>

<section>
    <div class="chat row">
        <div class="col-lg-3 col-md-4 col-sm-4 col-12 left">
            <div
                style="display: flex; direction: row; justify-content: space-between; border-bottom: 1px solid #22232e; width:100%"
            >
                <div class="user_section">
                    <div class="avatar">
                        <img src={avatar} alt="avatar" class="rounded-circle" />
                        <div class="name">
                            <p>Hello</p>
                            <h6>{userData?.username || "unnamed"}</h6>
                        </div>
                    </div>
                </div>
                <div style="display: flex;">
                    <div class="setting" on:click={goSetting}>
                        <SettingsIcon size="20" />
                    </div>
                    <div class="add_user">
                        <UserPlusIcon size="20" />
                    </div>
                </div>
            </div>

            <div class="input-group">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Search Assets"
                    name="search"
                    id="search"
                    bind:value={search}
                    aria-describedby="search-icon"
                    on:input={getOnineUser}
                />
                <span class="input-group-text" id="search-icon">
                    <img src={search_logo} alt="search" />
                </span>
            </div>

            <div class="user_list">
                <div class="user" on:click={(e) => connectWRTC("lionheart", e)}>
                    <div class="avatar_name">
                        <div
                            style="position: relative; width:44px; height:44px"
                        >
                            <img
                                src={avatar}
                                alt="avatar"
                                class="rouned-circle"
                            />
                            <div class="status active" />
                        </div>
                        <div class="user_name">
                            <h6>Abraham</h6>
                            <p>What???s up?</p>
                        </div>
                    </div>
                    <div class="time_ago">
                        {#if secure && secure["lionheart"]}
                            <div class="secure">
                                <LockIcon size="20" />
                            </div>
                        {/if}
                        5M Ago
                    </div>
                </div>
            </div>
            <div class="logout" on:click={logout}>
                <LogOutIcon />
            </div>
        </div>
        <div class="col-lg-9 col-md-12 col-sm-12 col-12 right">
            {#if setting}
                <Setting />
            {:else if !isEmpty(room)}
                <ChatArea {room} />
            {/if}
        </div>
    </div>
</section>

<style>
    section {
        width: 100%;
        padding: 20px;
        color: var(--grey_color);
        height: 100vh;
    }
    .chat {
        background-color: var(--main_back_color);
        border-radius: 12px;
        border: 1px solid #22232e;
        min-height: 100%;
        margin-left: 20px;
        margin-right: 20px;
    }
    .chat .left {
        border: 1px solid #22232e;
        border-bottom-left-radius: 12px;
        border-top-left-radius: 12px;
        padding-left: 0px;
        padding-right: 0px;
        position: relative;
    }
    .chat .right {
        border: 1px solid #22232e;
        border-bottom-right-radius: 12px;
        border-top-right-radius: 12px;
    }
    .avatar {
        padding: 20px;
        display: flex;
    }
    .avatar img {
        border: 2px solid #22232e;
        padding: 4px;
        background-color: cadetblue;
        width: 45px;
        height: 45px;
    }
    .avatar .name {
        margin-left: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .avatar .name p {
        font-size: 12px;
        margin-bottom: 0px;
        font-size: 12px;
        color: var(--grey_color);
    }
    .avatar .name h6 {
        margin-bottom: 0px;
        font-size: 18px;
        color: white;
    }
    .setting {
        margin: 20px;
        margin-right: 0px;
        border-radius: 50%;
        border: 2px solid #22232e;
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .add_user {
        margin: 20px;
        margin-left: 5px;
        border-radius: 50%;
        border: 2px solid #22232e;
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .setting:hover,
    .add_user:hover {
        background-color: #0b0b12;
        color: white;
    }

    .input-group {
        background-color: transparent;
        width: 100%;
        border-radius: 12px;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
    }

    .input-group input {
        padding: 15px 15px;
        padding-left: 20px;
        border-radius: 12px;
        background-color: var(--background_color);
        border: 1px solid rgba(48, 51, 58, 0.5);
        height: 48px;
        border-right: none;
        color: white;
        font-size: 12px;
    }

    .input-group input::placeholder {
        color: white;
    }

    .input-group input:focus,
    .input-group input:focus-visible {
        outline: none;
        box-shadow: none;
    }

    .input-group span {
        background-color: var(--background_color);
        border: 1px solid rgba(48, 51, 58, 0.5);
        border-radius: 12px;
        border-left: none;
    }

    .user_list {
        max-height: calc(100vh - 214px);
        overflow-y: scroll;
    }

    .user_list::-webkit-scrollbar {
        width: 4px;
    }

    .user_list::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    .user_list::-webkit-scrollbar-thumb {
        background-color: black;
        border-radius: 5px;
    }

    .user {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 20px;
        padding-left: 20px;
        padding-right: 20px;
        border-bottom: 1px solid #22232e;
        align-items: center;
        height: 85px;
    }
    .user:hover {
        background-color: #0b0b12;
    }
    .status {
        position: absolute;
        width: 10px;
        height: 10px;
        bottom: 1px;
        right: 1px;
        z-index: 999999;
        border-radius: 50%;
        border: 1px solid #0b0b12;
    }
    .avatar_name {
        display: flex;
    }
    .avatar_name img {
        background-color: beige;
        border-radius: 50%;
        width: 45px;
        height: 45px;
    }
    .user_name {
        margin-left: 10px;
    }
    .user_name h6 {
        font-size: 18px;
        color: white;
    }
    .user_name p {
        font-size: 12px;
        color: var(--grey_color);
        margin-bottom: 0px;
    }
    .secure {
        color: green;
        display: flex;
        margin-bottom: 5px;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: center;
    }
    .time_ago {
        font-size: 12px;
    }

    .right {
        padding-left: 0px;
        padding-right: 0px;
    }

    .logout {
        position: absolute;
        right: 20px;
        bottom: 20px;
        background-color: #22232e;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
    }
</style>

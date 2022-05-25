<script context="module">
    export const prerender = true;
</script>

<script>
    import { UserPlusIcon } from "svelte-feather-icons";
    import { onMount } from "svelte";

    import ChatArea from '$lib/components/chat/ChatArea.svelte'

    import avatar from "./../assets/img/avatar/avatar.png";
    import search_logo from "./../assets/img/search.svg";
    import isEmpty from "../utils/is-empty";
    import { compress, decompress } from 'lz-string'
    
    let search, userData;

    onMount(()=>{
        if(typeof localStorage !== "undefined"){
            if(isEmpty(localStorage.getItem('user_token'))){
                window.location = "/login";
            }
        }
    })

    $: if(typeof localStorage !== "undefined"){
        userData = JSON.parse(decompress(localStorage.getItem('user_data')))
    }
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
                        <img
                            src={avatar}
                            alt="avatar"
                            width="45"
                            height="45"
                            class="rounded-circle"
                        />
                        <div class="name">
                            <p>Hello</p>
                            <h6>{userData?.username || "unnamed"}</h6>
                        </div>
                    </div>
                </div>
                <div class="add_user">
                    <UserPlusIcon size="20" />
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
                />
                <span class="input-group-text" id="search-icon">
                    <img src={search_logo} alt="search" />
                </span>
            </div>

            <div class="user_list">
                <div class="user">
                    <div class="avatar_name">
                        <div
                            style="position: relative; width:44px; height:44px"
                        >
                            <img
                                src={avatar}
                                width="40"
                                height="40"
                                alt="avatar"
                                class="rouned-circle"
                            />
                            <div class="status active" />
                        </div>
                        <div class="user_name">
                            <h6>Abraham</h6>
                            <p>What’s up?</p>
                        </div>
                    </div>
                    <div class="time_ago">5M Ago</div>
                </div>
                <div class="user">
                    <div class="avatar_name">
                        <div
                            style="position: relative; width:44px; height:44px"
                        >
                            <img
                                src={avatar}
                                width="40"
                                height="40"
                                alt="avatar"
                                class="rouned-circle"
                            />
                            <div class="status inactive" />
                        </div>
                        <div class="user_name">
                            <h6>Abraham</h6>
                            <p>What’s up?</p>
                        </div>
                    </div>
                    <div class="time_ago">5M Ago</div>
                </div>
                <div class="user">
                    <div class="avatar_name">
                        <div
                            style="position: relative; width:44px; height:44px"
                        >
                            <img
                                src={avatar}
                                width="40"
                                height="40"
                                alt="avatar"
                                class="rouned-circle"
                            />
                            <div class="status active" />
                        </div>
                        <div class="user_name">
                            <h6>Abraham</h6>
                            <p>What’s up?</p>
                        </div>
                    </div>
                    <div class="time_ago">5M Ago</div>
                </div>
                <div class="user">
                    <div class="avatar_name">
                        <div
                            style="position: relative; width:44px; height:44px"
                        >
                            <img
                                src={avatar}
                                width="40"
                                height="40"
                                alt="avatar"
                                class="rouned-circle"
                            />
                            <div class="status inactive" />
                        </div>
                        <div class="user_name">
                            <h6>Abraham</h6>
                            <p>What’s up?</p>
                        </div>
                    </div>
                    <div class="time_ago">5M Ago</div>
                </div>
                <div class="user">
                    <div class="avatar_name">
                        <div
                            style="position: relative; width:44px; height:44px"
                        >
                            <img
                                src={avatar}
                                width="40"
                                height="40"
                                alt="avatar"
                                class="rouned-circle"
                            />
                            <div class="status active" />
                        </div>
                        <div class="user_name">
                            <h6>Abraham</h6>
                            <p>What’s up?</p>
                        </div>
                    </div>
                    <div class="time_ago">5M Ago</div>
                </div>
                <div class="user">
                    <div class="avatar_name">
                        <div
                            style="position: relative; width:44px; height:44px"
                        >
                            <img
                                src={avatar}
                                width="40"
                                height="40"
                                alt="avatar"
                                class="rouned-circle"
                            />
                            <div class="status inactive" />
                        </div>
                        <div class="user_name">
                            <h6>Abraham</h6>
                            <p>What’s up?</p>
                        </div>
                    </div>
                    <div class="time_ago">5M Ago</div>
                </div>
                <div class="user">
                    <div class="avatar_name">
                        <div
                            style="position: relative; width:44px; height:44px"
                        >
                            <img
                                src={avatar}
                                width="40"
                                height="40"
                                alt="avatar"
                                class="rouned-circle"
                            />
                            <div class="status active" />
                        </div>
                        <div class="user_name">
                            <h6>Abraham</h6>
                            <p>What’s up?</p>
                        </div>
                    </div>
                    <div class="time_ago">5M Ago</div>
                </div>
                <div class="user">
                    <div class="avatar_name">
                        <div
                            style="position: relative; width:44px; height:44px"
                        >
                            <img
                                src={avatar}
                                width="40"
                                height="40"
                                alt="avatar"
                                class="rouned-circle"
                            />
                            <div class="status inactive" />
                        </div>
                        <div class="user_name">
                            <h6>Abraham</h6>
                            <p>What’s up?</p>
                        </div>
                    </div>
                    <div class="time_ago">5M Ago</div>
                </div>
                <div class="user">
                    <div class="avatar_name">
                        <div
                            style="position: relative; width:44px; height:44px"
                        >
                            <img
                                src={avatar}
                                width="40"
                                height="40"
                                alt="avatar"
                                class="rouned-circle"
                            />
                            <div class="status active" />
                        </div>
                        <div class="user_name">
                            <h6>Abraham</h6>
                            <p>What’s up?</p>
                        </div>
                    </div>
                    <div class="time_ago">5M Ago</div>
                </div>
                <div class="user">
                    <div class="avatar_name">
                        <div
                            style="position: relative; width:44px; height:44px"
                        >
                            <img
                                src={avatar}
                                width="40"
                                height="40"
                                alt="avatar"
                                class="rouned-circle"
                            />
                            <div class="status inactive" />
                        </div>
                        <div class="user_name">
                            <h6>Abraham</h6>
                            <p>What’s up?</p>
                        </div>
                    </div>
                    <div class="time_ago">5M Ago</div>
                </div>
            </div>
        </div>
        <div class="col-lg-9 col-md-12 col-sm-12 col-12 right">
            <ChatArea />
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
    .add_user {
        margin: 20px;
        border-radius: 50%;
        border: 2px solid #22232e;
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
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
    }
    .status {
        position: absolute;
        width: 10px;
        height: 10px;
        bottom: 1px;
        right: 1px;
        z-index: 999999;
        border-radius: 50%;
    }
    .status.active {
        background-color: greenyellow;
    }
    .status.inactive {
        background-color: grey;
    }
    .avatar_name {
        display: flex;
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

    .right{
        padding-left: 0px;
        padding-right: 0px;
    }
</style>

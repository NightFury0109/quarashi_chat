<script>
    import LZString from "lz-string";
    let compress = LZString.compress;
    let decompress = LZString.decompress;
    import { afterUpdate, onMount } from "svelte";
    import { SendIcon, MoreHorizontalIcon } from "svelte-feather-icons";

    import isEmpty from "../../../utils/is-empty.js";
    import { send_message } from "../../../api/message/message.js";
    import { difference2Parts } from "./../../../helper";

    export let room = "";

    let content,
        text,
        messge_content,
        chat_content,
        current_time,
        message,
        username,
        diffs = [],
        user_chat_setting_hover = false,
        secure;

    $: setInterval(() => {
        current_time = new Date();
        if (isEmpty(localStorage.getItem("peer_chat_content"))) {
            message = {};
        } else {
            message = JSON.parse(
                decompress(localStorage.getItem("peer_chat_content"))
            );
        }
        secure = localStorage.getItem("private")
            ? JSON.parse(decompress(localStorage.getItem("private")))[room]
            : {};
    });

    $: if (typeof localStorage !== "undefined") {
        username = JSON.parse(decompress(localStorage.getItem("user_token")))[
            "username"
        ];
    }

    onMount(() => {
        if (typeof document !== "undefined" && room !== "") {
            content = document.getElementById("sender");
            text = document.getElementById("text_area");
            chat_content = document.getElementById("messages");
            chat_content.scrollTop = chat_content.scrollHeight + 100;
        }
        if (typeof localStorage !== "undefined") {
            if (isEmpty(localStorage.getItem("peer_chat_content"))) {
                message = {};
            } else {
                message = JSON.parse(
                    decompress(localStorage.getItem("peer_chat_content"))
                );

                // message[room].map((item) => {
                //     diffs.push(difference2Parts(current_time - item.time));
                // });
            }
        }
    });

    afterUpdate(() => {
        if (typeof document !== "undefined" && room !== "") {
            content = document.getElementById("sender");
            text = document.getElementById("text_area");
            chat_content = document.getElementById("messages");
            chat_content.scrollTop = chat_content.scrollHeight + 100;
        }
        if (typeof localStorage !== "undefined") {
            if (isEmpty(localStorage.getItem("peer_chat_content"))) {
                message = {};
            } else {
                message = JSON.parse(
                    decompress(localStorage.getItem("peer_chat_content"))
                );
                // message[room].map((item) => {
                //     diffs.push(difference2Parts(current_time - item.time));
                // });
            }
        }
    });

    const detectShiftEnter = (e) => {
        if (e.key === "Enter" && e.shiftKey) {
            let original_height = content.offsetHeight;
            let original_text_height = text.offsetHeight;
            content.style.height = original_height + 25 + "px";
            text.style.height = original_text_height + 25 + "px";
        } else if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (messge_content !== "" && room !== "") {
            send_message(messge_content);
            let create_time = new Date();
            if (typeof localStorage !== "undefined") {
                let sender = JSON.parse(
                    decompress(localStorage.getItem("user_token"))
                )["username"];
                let data = {
                    message_content: messge_content,
                    time: create_time,
                    sender: sender,
                };
                if (isEmpty(message[`${room}`])) {
                    message[`${room}`] = [];
                }
                message[`${room}`].push(data);
                localStorage.setItem(
                    "peer_chat_content",
                    compress(JSON.stringify(message))
                );
            }
            messge_content = "";
            content.style.height = 85 + "px";
            text.style.height = 30 + "px";
        }
    };

    const enter_setting = () => {
        user_chat_setting_hover = true;
    };
    const leave_setting = () => {
        user_chat_setting_hover = false;
    };

    const privateChat = () => {
        if (typeof localStorage !== "undefined") {
            let data;
            if (localStorage.getItem("private")) {
                data = JSON.parse(decompress(localStorage.getItem("private")));
                data[room] = !data[room];
            } else {
                data = {};
                data[room] = true;
            }
            localStorage.setItem("private", compress(JSON.stringify(data)));
        }
    };
</script>

<div class="chat_area">
    <div
        class="chat_setting"
        on:mouseenter={enter_setting}
        on:mouseleave={leave_setting}
    >
        <div class="chat_icon">
            <MoreHorizontalIcon size="25" />
        </div>
        {#if user_chat_setting_hover}
            <div class="setting_options">
                <li on:click={privateChat}>
                    {#if secure}
                        Disable Secure Chat
                    {:else}
                        Activate Secure Chat
                    {/if}
                </li>
                <li>Block User</li>
            </div>
        {/if}
    </div>
    <div class="messages" id="messages">
        {#if !isEmpty(message)}
            {#each message[`${room}`] as item, index}
                {#if item.sender === username}
                    <div class="send">
                        <div>
                            {item.message_content}
                        </div>
                        <p class="time">{item.time}</p>
                    </div>
                {:else}
                    <div class="receive">
                        <div>
                            {item.message_content}
                        </div>
                        <p class="time">
                            {item.time}
                            <!-- ${diffs[index].hoursTotal > 0
                                ? diffs[index].hoursTotal + "H"
                                : ""} ${diffs[index].minutesTotal + "M ago"} -->
                        </p>
                    </div>
                {/if}
            {/each}
        {/if}
    </div>
    <div class="sender" id="sender">
        <div class="input_group">
            <textarea
                rows="1"
                placeholder="Type A Message (shift+enter: new line, enter: send message)"
                on:keypress={detectShiftEnter}
                id="text_area"
                bind:value={messge_content}
            />
            <button
                class="icon"
                on:click={sendMessage}
                disabled={!messge_content}
            >
                <SendIcon class="sendicon" />
            </button>
        </div>
    </div>
</div>

<style>
    .chat_setting {
        position: absolute;
        right: 0;
        margin-right: 20px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .chat_icon {
        height: 30px;
        width: 30px;
        background-color: rgba(65, 64, 64, 0.7);
        justify-content: flex-end;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        border-radius: 50%;
        padding: 5px;
    }
    .setting_options {
        background-color: rgba(65, 64, 64, 0.9);
        border-radius: 12px;
        padding: 5px;
        margin-top: 5px;
    }
    .setting_options li {
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 2px 10px;
        list-style-type: none;
        cursor: pointer;
        font-size: 14px;
    }
    .setting_options li:hover {
        color: white;
    }
    .chat_area {
        height: 100%;
        position: relative;
    }

    .input_group {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .input_group textarea {
        background-color: transparent;
        width: 95%;
        border: none;
        color: white;
        resize: none;
    }
    .input_group textarea:hover,
    .input_group textarea:active,
    .input_group textarea:focus,
    .input_group textarea:focus-visible {
        border: none !important;
        outline: none !important;
    }

    .messages {
        padding-top: 30px;
        padding-left: 40px;
        padding-right: 40px;
        max-height: calc(100vh - 135px);
        overflow-y: scroll;
    }
    .messages::-webkit-scrollbar {
        width: 4px;
    }

    .messages::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    .messages::-webkit-scrollbar-thumb {
        background-color: black;
        border-radius: 5px;
    }

    .sender {
        background-color: var(--background_color);
        min-height: 85px;
        height: 85px;
        padding: 25px;
        position: absolute;
        bottom: 0px;
        width: 100%;
        border-bottom-right-radius: 12px;
        border: 1px solid #22232e;
        border-bottom: none;
        border-left: none;
        border-right: none;
    }

    .icon {
        width: 40px;
        height: 40px;
        background-color: #092031;
        border-radius: 12px;
        padding: 7px;
        border: none;
    }
</style>

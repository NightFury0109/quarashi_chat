<script>
    import { compress, decompress } from "lz-string";
    import { onMount } from "svelte";
    import { SendIcon } from "svelte-feather-icons";
    import { send_message } from "../../../api/message/message.js";
    import isEmpty from "../../../utils/is-empty.js";

    export let room = "";

    let content,
        text,
        messge_content,
        chat_content,
        current_time,
        message,
        username;

    $: setInterval(() => {
        current_time = new Date();
        if (typeof document !== "undefined" && room !== "") {
            chat_content = document.getElementById("messages");
            chat_content.scrollTop = chat_content.scrollHeight + 100;
        }
        if (typeof localStorage !== "undefined") {
            if (isEmpty(localStorage.getItem("message"))) {
                message = {};
            } else {
                message = JSON.parse(
                    decompress(localStorage.getItem("message"))
                );
            }
        }
    });

    $: if (typeof localStorage !== "undefined") {
        if (isEmpty(localStorage.getItem("message"))) {
            message = {};
        } else {
            message = JSON.parse(decompress(localStorage.getItem("message")));
        }
    }

    onMount(() => {
        if (typeof document !== "undefined") {
            content = document.getElementById("sender");
            text = document.getElementById("text_area");
        }
        username = JSON.parse(decompress(localStorage.getItem("user_token")))[
            "username"
        ];
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

    let difference2Parts = (milliseconds) => {
        const secs = Math.floor(Math.abs(milliseconds) / 1000);
        const mins = Math.floor(secs / 60);
        const hours = Math.floor(mins / 60);
        const days = Math.floor(hours / 24);
        const millisecs = Math.floor(Math.abs(milliseconds)) % 1000;
        const multiple = (term, n) => (n !== 1 ? `${n} ${term}s` : `1 ${term}`);

        return {
            days: days,
            hours: hours % 24,
            hoursTotal: hours,
            minutesTotal: mins,
            minutes: mins % 60,
            seconds: secs % 60,
            secondsTotal: secs,
            milliSeconds: millisecs,
            get diffStr() {
                return `${multiple(`day`, this.days)}, ${multiple(
                    `hour`,
                    this.hours
                )}, ${multiple(`minute`, this.minutes)} and ${multiple(
                    `second`,
                    this.seconds
                )}`;
            },
            get diffStrMs() {
                return `${this.diffStr.replace(` and`, `, `)} and ${multiple(
                    `millisecond`,
                    this.milliSeconds
                )}`;
            },
        };
    };

    const sendMessage = () => {
        if (messge_content !== "" && room !== "") {
            send_message(messge_content);
            let create_time = new Date();
            let diffs = difference2Parts(current_time - create_time);
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
                } else {
                    // <p class='time'>${
                    //                 diffs.hoursTotal > 0
                    //                     ? diffs.hoursTotal + "H"
                    //                     : ""
                    //             } ${diffs.minutesTotal + "M ago"}
                    //             </p>\
                    // chat_content.innerHTML += `<div class='send'>\
                    //             <div>${messge_content}</div>\
                    //             <p class='time'>${current_time.toISOString()}\
                    //             </p>\
                    //         </div>`;
                }
                message[`${room}`].push(data);
                localStorage.setItem(
                    "message",
                    compress(JSON.stringify(message))
                );
            }
            messge_content = "";
            content.style.height = 85 + "px";
            text.style.height = 30 + "px";
        }
    };
</script>

<div class="chat_area">
    <div class="messages" id="messages">
        {#if !isEmpty(message)}
            {#each message[`${room}`] as item}
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
                        <p class="time">{item.time}</p>
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

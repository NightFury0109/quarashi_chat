<script context="module">
    export const prerender = true;
</script>

<script>
    import { afterUpdate, onMount } from "svelte";
    import { SendIcon } from "svelte-feather-icons";
    import { send_message } from "./../../../api/message/message";

    let content, text, messge_content, chat_content;

    onMount(() => {
        if (typeof document !== "undefined") {
            content = document.getElementById("sender");
            text = document.getElementById("text_area");
        }
    });

    afterUpdate(() => {
        if (typeof document !== "undefined") {
            chat_content = document.getElementById("messages");
            chat_content.scrollTop = chat_content.scrollHeight + 100;
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

    const sendMessage = (e) => {
        send_message(messge_content);
        messge_content = "";
        content.style.height = 85 + "px";
        text.style.height = 30 + "px";
    };
</script>

<div class="chat_area">
    <div class="messages" id="messages">
        <div class="receive">
            <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries,
            </div>
            <p class="time">5M ago</p>
        </div>
        <div class="send">
            <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries,
            </div>
            <p class="time">5M ago</p>
        </div>
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

    .messages .receive {
        background-color: var(--background_color);
        width: 70%;
        font-size: 12px;
        padding: 20px;
        padding-bottom: 8px;
        border-radius: 12px;
        border-top-left-radius: 0px;
        line-height: 24px;
        color: white;
        margin-top: 10px;
        margin-bottom: 10px;
        float: left;
    }
    .messages .receive .time {
        text-align: right;
        color: var(--grey_color);
    }
    .messages .send {
        background-color: #ff8b77;
        width: 70%;
        font-size: 12px;
        padding: 20px;
        padding-bottom: 8px;
        border-radius: 12px;
        border-top-right-radius: 0px;
        line-height: 24px;
        color: white;
        float: right;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .messages .send .time {
        text-align: right;
        color: #bebec1;
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

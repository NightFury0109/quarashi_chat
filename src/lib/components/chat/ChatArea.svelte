<script context="module">
    export const prerender = true;
</script>

<script>
    import { onMount } from "svelte";

    import { SendIcon } from "svelte-feather-icons";

    let content, text, messge_content;

    onMount(() => {
        if (typeof document !== "undefined") {
            content = document.getElementById("sender");
            text = document.getElementById("text_area");
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
        messge_content = "";
        content.style.height = 85 + "px";
        text.style.height = 30 + "px";
    };
</script>

<div class="chat_area">
    <div class="messages">Hello</div>
    <div class="sender" id="sender">
        <div class="input_group">
            <textarea
                rows="1"
                placeholder="Type A Message (shift+enter: new line, enter: send message)"
                on:keypress={detectShiftEnter}
                id="text_area"
                bind:value={messge_content}
            />
            <div class="icon" on:click={sendMessage}>
                <SendIcon class="sendicon" />
            </div>
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
    }
    .input_group textarea:hover,
    .input_group textarea:active,
    .input_group textarea:focus,
    .input_group textarea:focus-visible {
        border: none !important;
        outline: none !important;
    }

    .sender {
        background-color: var(--background_color);
        min-height: 85px;
        height: 85px;
        padding: 28px;
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
    }
</style>

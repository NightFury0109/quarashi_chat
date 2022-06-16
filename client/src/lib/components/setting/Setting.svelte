<script>
    let disableGroupNoti;
    let disablePrivate;

    import Switch from "../common/Switch.svelte";
    import isEmpty from "../../../utils/is-empty";
    import { onMount } from "svelte";

    const deleteAllData = () => {
        if (typeof localStorage !== "undefined") {
            localStorage.removeItem("peer_chat_content");
        }
    };

    onMount(() => {
        if (!isEmpty(localStorage.getItem("setting"))) {
            let setting = JSON.parse(localStorage.getItem("setting"));
            disableGroupNoti = !setting.notificationSetting;
            disablePrivate = !setting.privateSetting;
        } else {
            disableGroupNoti = false;
            disablePrivate = false;
        }
    });

    $: if (typeof localStorage !== "undefined") {
        let setting = {
            notificationSetting: !disableGroupNoti,
            privateSetting: !disablePrivate,
        };
        localStorage.setItem("setting", JSON.stringify(setting));
    }
</script>

<div class="setting_box">
    <div class="dis_noti">
        <h5>Disable Group Notifications</h5>
        <Switch bind:checked={disableGroupNoti} />
    </div>
    <div class="dis_private">
        <h5>Disable Private Messages</h5>
        <Switch bind:checked={disablePrivate} />
    </div>
    <div class="dis_private">
        <h5>CLEAN all the CHAT private messages from my device</h5>
        <h6 class="btn" on:click={deleteAllData}>CLEAR</h6>
    </div>
</div>

<style>
    .setting_box {
        margin-top: 40px;
        color: white;
        padding-left: 20px;
        padding-right: 20px;
    }
    .dis_noti,
    .dis_private {
        display: flex;
        justify-content: space-between;
        border: 1px solid #22232e;
        border-radius: 12px;
        padding: 28px;
        align-items: center;
        margin-bottom: 20px;
    }
    h5 {
        margin-bottom: 0px;
        font-size: 18px;
    }
    h6 {
        margin-bottom: 0px;
    }
    .btn {
        color: white;
    }
    .btn:hover {
        color: grey;
    }
</style>

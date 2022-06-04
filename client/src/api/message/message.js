import api from '../../utils/api.js'
import { send_message_content } from './../webrtc/index'

export const send_message = async (message_content) => {
    try {
        send_message_content(message_content);
    } catch (err) {
        console.log("Message send is failed. Check your network status.")
    }
}
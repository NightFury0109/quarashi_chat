import api from '../../utils/api.js'
import { sendChannelStore } from './../../store'

export const send_message = async (message_content) => {
    let sendChannel;
    sendChannelStore.subscribe(item=>
            sendChannel = item
        )
    console.log(sendChannel)
    try {
        if(sendChannel){
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
            sendChannel.send(message_content)
            console.log('Sent Data: ' + message_content);
        }
    } catch (err) {
        console.log("Message send is failed. Check your network status.")
    }
}
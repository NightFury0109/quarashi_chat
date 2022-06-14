import isEmpty from './../../utils/is-empty'

import { p2pConnect } from './p2pConnect'
import { coturnConnect, connectSocket_coturn, sendMessage_coturn } from './coturnConnect'
let connect_way;

export const connectSocket = () => {
    if (connect_way == "coturn") {
        connectSocket_coturn()
    }
}

export const connectRTC = () => {
    // try {
    //     p2pConnect()
    //     connect_way = "p2p"
    // } catch(err) {
    //     console.log(err)
    coturnConnect()
    connect_way = "coturn"
    // }
}

export const send_message_content = (message_content) => {
    if (connect_way == "coturn") {
        sendMessage_coturn(message_content)
    }
}

// connect the peer connection with stun server




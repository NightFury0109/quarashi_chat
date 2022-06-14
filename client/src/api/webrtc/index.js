import isEmpty from './../../utils/is-empty'

import { p2pConnect } from './p2pConnect'
import { turnConnect, connectSocket_turn, sendMessage_turn } from './coturnConnect'
let connect_way;

export const connectSocket = () => {
    if (connect_way == "turn") {
        connectSocket_turn()
    }
}

export const connectRTC = () => {
    // try {
    //     p2pConnect()
    //     connect_way = "p2p"
    // } catch(err) {
    //     console.log(err)
    turnConnect()
    connect_way = "turn"
    // }
}

export const send_message_content = (message_content) => {
    if (connect_way == "turn") {
        sendMessage_turn(message_content)
    }
}

// connect the peer connection with stun server




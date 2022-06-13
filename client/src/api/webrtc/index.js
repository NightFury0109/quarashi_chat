import LZString from "lz-string";
let compress = LZString.compress;
let decompress = LZString.decompress;

import isEmpty from './../../utils/is-empty'
import { iceServers } from './../../utils/iceServers.js'
import { p2pConnect } from './p2pConnect'
import { turnConnect } from './turnConnect'

export const connectSocket = () => {
    socket.emit('create or join', room)
    socket.emit('ipaddr');
}

export const connectRTC = () => {
    try {
        p2pConnect()
    } catch(err) {
        console.log(err)
        turnConnect()
    }
}

export const send_message_content = (message_content) => {
    // console.log('sending_data_through_peer_connection', message_content)
    sendChannel.send(message_content)
}

// connect the peer connection with stun server




import api from '../../utils/api.js'
import { iceServers } from './../../utils/iceServers.js'
import SimplePeer from 'simple-peer'
import wrtc from 'wrtc';

let new_peer = new SimplePeer({ initiator: true, wrtc: wrtc })
new_peer.on('error', err => console.log(err))
new_peer.on('signal', data => {
    console.log('SIGNAL', JSON.stringify(data))
})

export const send_message = async (message_content) => {
    console.log(message_content)
    new_peer.signal(message_content)
}
import api from './../../utils/api'
import P2P from 'socket.io-p2p'
import io from 'socket.io-client'

let socket = io();
let p2p = new P2P(socket)
p2p.useSockets = false;
p2p.emit('go-private', true)

p2p.on('peer-msg', function (data) {
    console.log('From a peer %s', data);
});

export const send_message = (message) => {
    if(typeof window !== "undefined"){
        p2p.emit('peer-msg', { textVal: message })
    }
}
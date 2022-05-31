// import api from './../../utils/api'
import P2P from 'socket.io-p2p';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

let opts = { peerOpts: { trickle: false }, autoUpgrade: false }

const p2p = new P2P(socket, null, () => {
    console.log('my ID is: ', p2p.peerId)
});

// p2p.usePeerConnection = true;

p2p.on('peer-msg', function (data) {
    console.log('From a peer %s', data);
});

export const send_message = (message) => {
    console.log(message)
    // p2p.emit('peer-msg', { message: message })
    p2p.on('peer-msg', function (data) {
        console.log('From a peer %s', data);
    });
}
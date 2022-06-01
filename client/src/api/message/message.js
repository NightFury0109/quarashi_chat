import api from '../../utils/api.js'
import { iceServers } from './../../utils/iceServers.js'
import io from 'socket.io-client';
let socket = io.connect('http://localhost:5000');

export const connectRTC = () => {
    let peerConnection = new RTCPeerConnection(iceServers);

    console.log(peerConnection)

    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            sendMessage({ 'candidate': event.candidate });
        }
    };

    registerPeerConnectionListeners()

}

const registerPeerConnectionListeners = () => {
    peerConnection.addEventListener('icegatheringstatechange', () => {
        console.log(
            `ICE gathering state changed: ${peerConnection.iceGatheringState}`);
    });

    peerConnection.addEventListener('connectionstatechange', () => {
        console.log(`Connection state change: ${peerConnection.connectionState}`);
    });

    peerConnection.addEventListener('signalingstatechange', () => {
        console.log(`Signaling state change: ${peerConnection.signalingState}`);
    });

    peerConnection.addEventListener('iceconnectionstatechange ', () => {
        console.log(
            `ICE connection state change: ${peerConnection.iceConnectionState}`);
    });
}

export function sendMessage(message) {
    console.log(socket.id)
    message.room = room;
    socket.emit(
        socketActions.message,
        message,
    );
}

export const send_message = async (message_content) => {
    console.log(message_content)
    // new_peer.signal(message_content)
}























// import SimplePeer from 'simple-peer'
// import wrtc from 'wrtc';

// let new_peer = new SimplePeer({ initiator: true, wrtc: wrtc })
// new_peer.on('error', err => console.log(err))
// new_peer.on('signal', data => {
//     console.log('SIGNAL', JSON.stringify(data))
// })


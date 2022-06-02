import api from '../../utils/api.js'
import { iceServers } from './../../utils/iceServers.js'
// import io from 'socket.io-client';
// let socket = io.connect('http://localhost:5000');
let sendChannel, receiveChannel, localConnection, remoteConnection;

export const connectRTC = () => {
    // local side
    localConnection = new RTCPeerConnection(iceServers);
    sendChannel = localConnection.createDataChannel('sendDataChannel');

    localConnection.onicecandidate = e => {
        onIceCandidate(localConnection, e);
    };

    sendChannel.onopen = onSendChannelStateChange;
    sendChannel.onclose = onSendChannelStateChange;

    // Remote side
    remoteConnection = new RTCPeerConnection(iceServers);

    remoteConnection.onicecandidate = e => {
        onIceCandidate(remoteConnection, e);
    };
    remoteConnection.ondatachannel = receiveChannelCallback;

    localConnection.createOffer().then(
        gotDescription1,
        onCreateSessionDescriptionError
    );
}

const receiveChannelCallback = (event) => {
    console.log('Receive Channel Callback');
    receiveChannel = event.channel;
    receiveChannel.onmessage = onReceiveMessageCallback;
    receiveChannel.onopen = onReceiveChannelStateChange;
    receiveChannel.onclose = onReceiveChannelStateChange;
}

const gotDescription1 = (desc) => {
    localConnection.setLocalDescription(desc);
    console.log(`Offer from localConnection\n${desc.sdp}`);
    remoteConnection.setRemoteDescription(desc);
    remoteConnection.createAnswer().then(
        gotDescription2,
        onCreateSessionDescriptionError
    );
}

const gotDescription2 = (desc) => {
    remoteConnection.setLocalDescription(desc);
    console.log(`Answer from remoteConnection\n${desc.sdp}`);
    localConnection.setRemoteDescription(desc);
}

const onReceiveMessageCallback = (event) => {
    console.log('Received Message', event);
}

const onReceiveChannelStateChange = () => {
    const readyState = receiveChannel.readyState;
    console.log(`Receive channel state is: ${readyState}`);
}

const onCreateSessionDescriptionError = (error) => {
    console.log('Failed to create session description: ' + error.toString());
}

const onIceCandidate = (pc, event) => {
    getOtherPc(pc)
        .addIceCandidate(event.candidate)
        .then(
            onAddIceCandidateSuccess,
            onAddIceCandidateError
        );
    console.log(`${getName(pc)} ICE candidate: ${event.candidate ? event.candidate.candidate : '(null)'}`);
}

const onSendChannelStateChange = () => {
    const readyState = sendChannel.readyState;
    console.log('Send channel state is: ' + readyState);
}

const getOtherPc = (pc) => {
    return (pc === localConnection) ? remoteConnection : localConnection;
}

const onAddIceCandidateSuccess = () => {
    console.log('AddIceCandidate success or Two computer datachannel is connected');
}

const onAddIceCandidateError = (error) => {
    console.log(`Failed to add Ice Candidate: ${error.toString()}`);
}

const getName = (pc) => {
    return (pc === localConnection) ? 'localPeerConnection' : 'remotePeerConnection';
}



export const send_message = async (message_content) => {
    try {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        sendChannel.send(message_content)
        console.log('Sent Data: ' + message_content);
    } catch (err) {
        console.log("Message send is failed. Check your network status.")
    }
}
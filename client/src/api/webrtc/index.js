import { iceServers } from './../../utils/iceServers.js'
let sendChannel, receiveChannel, localConnection, remoteConnection, isInitiator;
import { localConnectionStore, remoteConnectionStore, sendChannelStore, receiveChannelStore } from './../../store'

let socket;
let room = "lionheart";

export const connectSocket = () => {
    console.log(room)
    socket.emit('create or join', room)
    if (location.hostname.match(/localhost|127\.0\.0/)) {
        socket.emit('ipaddr');
    }
}

export const connectRTC = () => {
    socket =  io('http://localhost:5000');
    socket.on('ipaddr', (ipaddr) => {
        console.log(ipaddr)
    });
    socket.on('created', (room, clientId) => {
        console.log('created room', room, '- my client ID is ', clientId)
    })
    socket.on('joined', (room, clientId) => {
        console.log('This Peer has joined room ', room, 'with clientID', clientId)
        // createPeerConnection(isInitiator)
    })
    socket.on('full', () => {
        console.log('room ', room, ' is full.')
    })
    socket.on('ready', () => {
        console.log('socket is ready')
        // createPeerConnection(isInitiator);
    })
    socket.on('log', () => {
        console.log.apply(console, array);
    })
    socket.on('message', (message) => {
        console.log('Client received message:', message);
        // signalingMessageCallback(message);
    })


    // local side

    // Remote side
    // remoteConnection = new RTCPeerConnection(iceServers);

    // remoteConnection.onicecandidate = e => {
    //     onIceCandidate(remoteConnection, e);
    // };
    // remoteConnection.ondatachannel = receiveChannelCallback;

    // localConnection.createOffer().then(
    //     gotDescription1,
    //     onCreateSessionDescriptionError
    // );

    // // store infos
    // localConnectionStore.set(localConnection)
    // remoteConnectionStore.set(remoteConnection)
    // sendChannelStore.set(sendChannel)
    // receiveChannelStore.set(receiveChannel)
}

// const createPeerConnection = (isInitiator) => {
//     localConnection = new RTCPeerConnection(iceServers);
//     sendChannel = localConnection.createDataChannel('sendDataChannel');

//     // send any ice candidates to the other peer
//     localConnection.onicecandidate = function (event) {
//         console.log('icecandidate event:', event);
//         if (event.candidate) {
//             sendMessage({
//                 type: 'candidate',
//                 label: event.candidate.sdpMLineIndex,
//                 id: event.candidate.sdpMid,
//                 candidate: event.candidate.candidate
//             });
//         } else {
//             console.log('End of candidates.');
//         }
//     };

//     sendChannel.onopen = onSendChannelStateChange;
//     sendChannel.onclose = onSendChannelStateChange;

//     const receiveChannelCallback = (event) => {
//         console.log('Receive Channel Callback');
//         receiveChannel = event.channel;
//         receiveChannel.onmessage = onReceiveMessageCallback;
//         receiveChannel.onopen = onReceiveChannelStateChange;
//         receiveChannel.onclose = onReceiveChannelStateChange;
//     }

//     const gotDescription1 = (desc) => {
//         localConnection.setLocalDescription(desc);
//         console.log(`Offer from localConnection\n${desc.sdp}`);
//         remoteConnection.setRemoteDescription(desc);
//         remoteConnection.createAnswer().then(
//             gotDescription2,
//             onCreateSessionDescriptionError
//         );
//     }

//     const gotDescription2 = (desc) => {
//         remoteConnection.setLocalDescription(desc);
//         console.log(`Answer from remoteConnection\n${desc.sdp}`);
//         localConnection.setRemoteDescription(desc);
//     }

//     const onReceiveMessageCallback = (event) => {
//         console.log('Received Message', event);
//     }

//     const onReceiveChannelStateChange = () => {
//         const readyState = receiveChannel.readyState;
//         console.log(`Receive channel state is: ${readyState}`);
//     }

//     const onCreateSessionDescriptionError = (error) => {
//         console.log('Failed to create session description: ' + error.toString());
//     }

//     const onIceCandidate = (pc, event) => {
//         getOtherPc(pc)
//             .addIceCandidate(event.candidate)
//             .then(
//                 onAddIceCandidateSuccess,
//                 onAddIceCandidateError
//             );
//         console.log(`${getName(pc)} ICE candidate: ${event.candidate ? event.candidate.candidate : '(null)'}`);
//     }

//     const onSendChannelStateChange = () => {
//         const readyState = sendChannel.readyState;
//         console.log('Send channel state is: ' + readyState);
//     }

//     const getOtherPc = (pc) => {
//         return (pc === localConnection) ? remoteConnection : localConnection;
//     }

//     const onAddIceCandidateSuccess = () => {
//         console.log('AddIceCandidate success or Two computer datachannel is connected');
//     }

//     const onAddIceCandidateError = (error) => {
//         console.log(`Failed to add Ice Candidate: ${error.toString()}`);
//     }

//     const getName = (pc) => {
//         return (pc === localConnection) ? 'localPeerConnection' : 'remotePeerConnection';
//     }
// }


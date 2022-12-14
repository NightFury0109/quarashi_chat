import LZString from "lz-string";
let compress = LZString.compress;
let decompress = LZString.decompress;

import isEmpty from '../../utils/is-empty'
import { stun_iceServers, turn_iceServers } from '../../utils/iceServers.js'
import { connectionSecure } from './../../store'

let sendChannel, localConnection, isInitiator;

let socket, turnReady, ip;
let room = "lionheart";

export const coturnConnect = () => {
    socket = io('http://localhost:5000');

    socket.on('ipaddr', (ipaddr) => {
        ip = ipaddr
        console.log(ip)
    });
    socket.on('created', (room, clientId) => {
        console.log('created room', room, '- my client ID is ', clientId)
        isInitiator = true;
    })
    socket.on('joined', (room, clientId) => {
        console.log('This Peer has joined room ', room, 'with clientID', clientId)
        isInitiator = false;
        createPeerConnection(isInitiator)
    })
    socket.on('full', () => {
        console.log('room ', room, ' is full.')
    })
    socket.on('ready', () => {
        createPeerConnection(isInitiator);
    })
    socket.on('message', (message) => {
        signalingMessageCallback(message);
    })
}

export const connectSocket_coturn = () => {
    socket.emit('create or join', room)
    socket.emit('ipaddr');
}

export const sendMessage_coturn = (message_content) => {
    sendChannel.send(message_content)
}

const createPeerConnection = (isInitiator) => {
    if (typeof localStorage !== "undefined" && localStorage.getItem('private') && JSON.parse(decompress(localStorage.getItem('private')))[room]) {
        localConnection = new RTCPeerConnection(stun_iceServers);
    } else {
        localConnection = new RTCPeerConnection(turn_iceServers);
    }

    localConnection.onicecandidate = (event) => {
        if (event.candidate !== null) {
            let connectSecure;
            connectionSecure.subscribe(secure => {
                connectSecure = secure
            })
            console.log('event.candidate>>>>>>>>>>', event.candidate)
            sendMessage({
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate
            });
            // console.log('event.candidate>>>>>', event.candidate)

            // If a srflx candidate was found, notify that the STUN server works!
            if (event.candidate.type == "srflx") {
                console.log(`   Your Public IP Address is: ${event.candidate.address}`);
                ip = event.candidate.address;
                console.log("The STUN server is reachable!");
                connectSecure[room] = true
            }

            // If a relay candidate was found, notify that the TURN server works!
            if (event.candidate.type == "relay") {
                console.log("The TURN server is reachable !");
                connectSecure[room] = false
            }
            connectionSecure.set(connectSecure)
        }
    };

    if (isInitiator) {
        sendChannel = localConnection.createDataChannel('sendDataChannel');
        onDataChannelCreated(sendChannel);
        localConnection.createOffer().then((offer) => {
            return localConnection.setLocalDescription(offer);
        })
            .then(() => {
                sendMessage(localConnection.localDescription);
            })
            .catch(err => {
                console.log(err)
            });
    } else {
        localConnection.ondatachannel = (event) => {
            sendChannel = event.channel;
            onDataChannelCreated(sendChannel);
        };
    }
}

const signalingMessageCallback = (message) => {
    if (message !== null) {
        if (message.type === 'offer') {
            localConnection.setRemoteDescription(new RTCSessionDescription(message), () => { },
                logError);
            localConnection.createAnswer(onLocalSessionCreated, logError);

        } else if (message.type === 'answer') {
            localConnection.setRemoteDescription(new RTCSessionDescription(message), () => { },
                logError);

        } else if (message.type === 'candidate') {
            localConnection.addIceCandidate(new RTCIceCandidate({
                candidate: message.candidate,
                sdpMLineIndex: message.label,
                sdpMid: message.id
            }));
        }
    }
}

const sendMessage = (message) => {
    // console.log('Client sending message: ', message);
    socket.emit('message', message);
}

const onDataChannelCreated = (channel) => {
    channel.onopen = onSendChannelStateChange;
    channel.onclose = onSendChannelStateChange;
    channel.onmessage = (adapter.browserDetails.browser === 'firefox') ?
        receiveDataFirefoxFactory() : receiveDataChromeFactory();
}

// get turn server list from generate turn server
// const requestTurn = (turnURL) => {
//     let turnExists = false;
//     if (iceServers[0].urls.substr(0, 5) === 'turn:') {
//         turnExists = true;
//         turnReady = true;
//     }
//     if (!turnExists) {
//         //when iceserver is don't exist ask from server
//         console.log('Getting TURN server from ', turnURL);
//         let xhr = new XMLHttpRequest();
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 let turnServer = JSON.parse(xhr.responseText);
//                 console.log('Got TURN server: ', turnServer);
//                 iceServers.push({
//                     'urls': 'turn:' + turnServer.username + '@' + turnServer.turn,
//                     'credential': turnServer.password
//                 });
//                 turnReady = true;
//             }
//         };
//         xhr.open('GET', turnURL, true);
//         xhr.send();
//     }
// }

const onLocalSessionCreated = (desc) => {
    localConnection.setLocalDescription(desc).then(() => {
        sendMessage(localConnection.localDescription);
    }).catch(logError);
}

const onSendChannelStateChange = () => {
    const readyState = sendChannel.readyState;
    console.log('Send channel state is: ' + readyState);
}

const receiveDataChromeFactory = () => {

    return onmessage = (event) => {
        if (typeof event.data === 'string' && typeof localStorage !== "undefined") {
            let message;
            if (!isEmpty(localStorage.getItem('peer_chat_content'))) {
                message = JSON.parse(decompress(localStorage.getItem('peer_chat_content')));
            } else {
                message = {}
            }
            let create_time = new Date();
            let data = {
                message_content: event.data,
                time: create_time,
                sender: "",
            };
            if (isEmpty(message) || isEmpty(message[room])) {
                message[room] = [];
            }
            message[room].push(data);
            localStorage.setItem(
                "peer_chat_content",
                compress(JSON.stringify(message)))
        }

        // send the file.
        // var buf, count;

        // var data = new Uint8ClampedArray(event.data);
        // buf.set(data, count);

        // count += data.byteLength;
        // console.log('count: ' + count);

        // if (count === buf.byteLength) {
        //     // we're done: all data chunks have been received
        //     console.log('Done. Rendering photo.');
        //     renderPhoto(buf);
        // }
    };
}

const receiveDataFirefoxFactory = () => {

    return onmessage = (event) => {
        if (typeof event.data === 'string' && typeof localStorage !== "undefined") {
            let message;
            if (!isEmpty(localStorage.getItem('peer_chat_content'))) {
                message = JSON.parse(decompress(localStorage.getItem('peer_chat_content')));
            } else {
                message = {}
            }
            let create_time = new Date();
            let data = {
                message_content: event.data,
                time: create_time,
                sender: "",
            };
            if (isEmpty(message) || isEmpty(message[room])) {
                message[room] = [];
            }
            message[room].push(data);
            localStorage.setItem(
                "peer_chat_content",
                compress(JSON.stringify(message)))
        }

        // send the file in firefox
        // var count, total, parts;

        // parts.push(event.data);
        // count += event.data.size;
        // console.log('Got ' + event.data.size + ' byte(s), ' + (total - count) +
        //     ' to go.');

        // if (count === total) {
        //     console.log('Assembling payload');
        //     var buf = new Uint8ClampedArray(total);
        //     var compose = function (i, pos) {
        //         var reader = new FileReader();
        //         reader.onload = function () {
        //             buf.set(new Uint8ClampedArray(this.result), pos);
        //             if (i + 1 === parts.length) {
        //                 console.log('Done. Rendering photo.');
        //                 renderPhoto(buf);
        //             } else {
        //                 compose(i + 1, pos + this.result.byteLength);
        //             }
        //         };
        //         reader.readAsArrayBuffer(parts[i]);
        //     };
        //     compose(0, 0);
        // }
    };
}

const logError = (err) => {
    if (!err) return;
    if (typeof err === 'string') {
        console.warn(err);
    } else {
        console.warn(err.toString(), err);
    }
}
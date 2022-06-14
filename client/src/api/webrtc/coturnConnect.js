import LZString from "lz-string";
let compress = LZString.compress;
let decompress = LZString.decompress;

import isEmpty from '../../utils/is-empty'
import { iceServers } from '../../utils/iceServers.js'

let sendChannel, localConnection, isInitiator;

let socket, turnReady;
let room = "lionheart";
let ip;

export const turnConnect = () => {
    socket = io('http://localhost:5000');

    socket.on('ipaddr', (ipaddr) => {
        console.log(ipaddr)
        ip = ipaddr
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
    socket.on('log', () => {
        console.log.apply(console, array);
    })
    socket.on('message', (message) => {
        signalingMessageCallback(message);
        // console.log('Client received message:', message);
    })
}

export const connectSocket_turn = () => {
    socket.emit('create or join', room)
    socket.emit('ipaddr');
}

export const sendMessage_turn = (message_content) => {
    sendChannel.send(message_content)
}

const createPeerConnection = (isInitiator) => {
    iceServers == null
    localConnection = new RTCPeerConnection(iceServers);

    localConnection.onicecandidate = (event) => {
        console.log('event.candidate', event.candidate)

        // check the turn or sturn server is working
        if (!isEmpty(event.candidate)) {
            if (event.candidate.type == "srflx") {
                console.log("The STUN server is reachable!");
                console.log(`Your Public IP Address is: ${event.candidate.address}`);
            }

            // If a relay candidate was found, notify that the TURN server works!
            if (event.candidate.type == "relay") {
                console.log("The TURN server is reachable !");
            }
        }

        if (event.candidate) {
            sendMessage({
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate
            });
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
    // console.log('DataChannel', sendChannel)
}

const signalingMessageCallback = (message) => {
    if (typeof message === "null" || isEmpty(message)) {
        console.log('message not received yet from socket server')
        return 0;
    } else {
        if (message.type === 'offer') {
            // console.log('Got offer. Sending answer to peer.');
            localConnection.setRemoteDescription(new RTCSessionDescription(message), () => { },
                logError);
            localConnection.createAnswer(onLocalSessionCreated, logError);

        } else if (message.type === 'answer') {
            // console.log('Got answer.');
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
    // console.log('local session created:', desc);
    localConnection.setLocalDescription(desc).then(() => {
        // console.log('sending local desc:', localConnection.localDescription);
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
            console.log('event.data', event.data, typeof event.data)
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
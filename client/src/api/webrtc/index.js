import { iceServers } from './../../utils/iceServers.js'
let sendChannel, localConnection, isInitiator;

let socket, turnReady;
let room = "lionheart";

export const connectSocket = () => {
    socket.emit('create or join', room)
    if (location.hostname.match(/localhost|127\.0\.0/)) {
        socket.emit('ipaddr');
    }
}

export const connectRTC = () => {
    socket = io('http://localhost:5000');

    socket.on('ipaddr', (ipaddr) => {
        console.log(ipaddr)
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
        console.log('socket is ready')
        createPeerConnection(isInitiator);
    })
    socket.on('log', () => {
        console.log.apply(console, array);
    })
    socket.on('message', (message) => {
        console.log('Client received message:', message);
        signalingMessageCallback(message);
    })

    if (location.hostname !== 'localhost' || location.hostname !== '127.0.0.1') {
        requestTurn(
            'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
        );
    }
}

const createPeerConnection = (isInitiator) => {
    console.log('create peer connection')
    localConnection = new RTCPeerConnection(iceServers);

    localConnection.onicecandidate = (event) => {
        console.log('icecandidate event:', event);
        if (event.candidate) {
            sendMessage({
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate
            });
        } else {
            console.log('End of candidates.');
        }
    };

    if (isInitiator) {
        sendChannel = localConnection.createDataChannel('sendDataChannel');
        onDataChannelCreated(sendChannel);
        localConnection.createOffer().then((offer) => {
            return localConnection.setLocalDescription(offer);
        })
            .then(() => {
                console.log('sending local desc:', localConnection.localDescription);
                sendMessage(localConnection.localDescription);
            })
            .catch(err => {
                console.log(err)
            });

    } else {
        localConnection.ondatachannel = (event) => {
            console.log('ondatachannel:', event.channel);
            sendChannel = event.channel;
            onDataChannelCreated(sendChannel);
        };
    }
    console.log('DataChannel', sendChannel)
}

function signalingMessageCallback(message) {
    if (typeof message === "null") {
        console.log('message not received yet')
    } else {
        if (message.type === 'offer') {
            console.log('Got offer. Sending answer to peer.');
            localConnection.setRemoteDescription(new RTCSessionDescription(message), function () { },
                logError);
            localConnection.createAnswer(onLocalSessionCreated, logError);

        } else if (message.type === 'answer') {
            console.log('Got answer.');
            localConnection.setRemoteDescription(new RTCSessionDescription(message), function () { },
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
    console.log('Client sending message: ', message);
    socket.emit('message', message);
}

const onDataChannelCreated = (channel) => {
    channel.onopen = onSendChannelStateChange;
    channel.onclose = onSendChannelStateChange;
    channel.onmessage = (adapter.browserDetails.browser === 'firefox') ?
        receiveDataFirefoxFactory() : receiveDataChromeFactory();
}

const requestTurn = (turnURL) => {
    let turnExists = false;
    if (iceServers[0].urls.substr(0, 5) === 'turn:') {
        turnExists = true;
        turnReady = true;
    }
    if (!turnExists) {
        //when iceserver is don't exist ask from server
        console.log('Getting TURN server from ', turnURL);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let turnServer = JSON.parse(xhr.responseText);
                console.log('Got TURN server: ', turnServer);
                iceServers.push({
                    'urls': 'turn:' + turnServer.username + '@' + turnServer.turn,
                    'credential': turnServer.password
                });
                turnReady = true;
            }
        };
        xhr.open('GET', turnURL, true);
        xhr.send();
    }
}

const onLocalSessionCreated = (desc) => {
    console.log('local session created:', desc);
    localConnection.setLocalDescription(desc).then(() => {
        console.log('sending local desc:', localConnection.localDescription);
        sendMessage(localConnection.localDescription);
    }).catch(logError);
}

const onSendChannelStateChange = () => {
    const readyState = sendChannel.readyState;
    console.log('Send channel state is: ' + readyState);
}

const receiveDataChromeFactory = () => {
    // var buf, count;

    return function onmessage(event) {
        console.log('event>>>>>>>>>>>>>>>>', event)
        if (typeof event.data === 'string' || typeof localStorage !== "undefined") {
            localStorage.setItem('message', event.data)
        }

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
    // var count, total, parts;

    return onmessage = (event) => {
        if (typeof event.data === 'string' || typeof localStorage !== "undefined") {
            localStorage.setItem('message', event.data)
        }

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

export const send_message_content = (message_content) => {
    console.log('sending_data_through_peer_connection', message_content)
    sendChannel.send(message_content)
}
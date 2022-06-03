let room = "lionheart";
let socket = io.connect('http://127.0.0.1:5000');
console.log('component is loaded')

document.getElementById('messages').onload = () => {
    console.log('component is loaded')
    socket.emit('create or join', room)
}

socket.on('ipaddr', (ipaddr) => {
    console.log(ipaddr)
});
socket.on('created', (room, clientId) => {
    console.log('created room', room, '- my client ID is ', clientId)
})
socket.on('joined', (room, clientId) => {
    console.log('This Peer has joined room ', room, 'with clientID', clientId)
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
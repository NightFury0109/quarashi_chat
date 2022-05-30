const server = require('http').createServer();
const io = require('socket.io')(server);
const p2p = require('socket.io-p2p-server').Server;

server.listen(9000, () => {
    console.log(`Server started on port 9000 :)`);
});

io.use(p2p);

io.on('connection', function (socket) {
    socket.on('peer-msg', function (data) {
        console.log('Message from peer: %s', data)
        socket.broadcast.emit('peer-msg', data)
    })

    socket.on('peer-file', function (data) {
        console.log('File from peer: %s', data)
        socket.broadcast.emit('peer-file', data)
    })

    socket.on('go-private', function (data) {
        socket.broadcast.emit('go-private', data)
    })
})

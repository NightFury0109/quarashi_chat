const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

server.listen(5000, () => {
    console.log(`Server started on port 5000 :)`);
});

io.on('connection', function (socket) {
    socket.on('peer-msg', function (data) {
        console.log('Message from peer: %s', data.message)
    })

    socket.on('peer-file', function (data) {
        console.log('File from peer: %s', data)
    })

    socket.on('go-private', function (data) {
        socket.broadcast.emit('go-private', data)
    })
    socket.on("message", (details) => {
        socket.broadcast.to(details.room).emit(socketActions.message, details);
        console.log(details)
    });
})

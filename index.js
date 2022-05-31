const express = require('express')
const app = express()
const server = require('http').createServer(app);
// const io = require('socket.io')(server, {
//     cors: {
//         origin: '*',
//     }
// });
// const p2p = require('socket.io-p2p-server').Server;

// server.listen(5000, () => {
//     console.log(`Server started on port 5000 :)`);
// });

// io.use(p2p);

// io.on('connection', function (socket) {
//     socket.on('peer-msg', function (data) {
//         console.log('Message from peer: %s', data.message)
//     })

//     socket.on('peer-file', function (data) {
//         console.log('File from peer: %s', data)
//     })

//     socket.on('go-private', function (data) {
//         socket.broadcast.emit('go-private', data)
//     })
// })

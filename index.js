const express = require("express");
const os = require('os');
const { createServer } = require("http");
const  Server = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,  {
    cors: {
        origin: "*",
        methods: ["*"]
    }
})

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

// trying with webrtc and socket.io

io.on('connection', (socket) => {
    // convenience function to log server messages on the client
    socket.on('message', (message) => {
        console.log('Client said: ', message);
        // for a real app, would be room-only (not broadcast)
        socket.broadcast.emit('message', message);
    });

    socket.on('create or join', (room) => {
        var clientsInRoom = io.sockets.adapter.rooms[room];
        var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
        console.log('Room ' + room + ' now has ' + numClients + ' client(s)');

        if (numClients === 0) {
            socket.join(room);
            console.log('Client ID ' + socket.id + ' created room ' + room);
            socket.emit('created', room, socket.id);
        } else if (numClients === 1) {
            console.log('Client ID ' + socket.id + ' joined room ' + room);
            io.sockets.in(room).emit('join', room);
            socket.join(room);
            socket.emit('joined', room, socket.id);
            io.sockets.in(room).emit('ready', room);
            socket.broadcast.emit('ready', room);
        } else { // max two clients
            socket.emit('full', room);
        }
    });

    socket.on('ipaddr', function () {
        let ifaces = os.networkInterfaces();
        for (let dev in ifaces) {
            ifaces[dev].forEach(function (details) {
                if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
                    socket.emit('ipaddr', details.address);
                }
            });
        }
    });

    // socket.on('disconnect', function (reason) {
    //     console.log(`Peer or server disconnected. Reason: ${reason}.`);
    //     socket.broadcast.emit('bye');
    // });

    // socket.on('bye', function (room) {
    //     console.log(`Peer said bye on room ${room}.`);
    // });
})

httpServer.listen(5000, () => {
    console.log(`Server started on port 5000 :)`);
});


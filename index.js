const express = require("express");
const os = require('os');
const { createServer } = require("http");
const Server = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
})

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.post('/getUsers', (req, res) => {
    console.log(io.sockets.adapter.rooms)
})

io.on('connection', (socket) => {
    socket.on('message', (message) => {
        socket.broadcast.emit('message', message);
    });

    socket.on('create or join', (room) => {
        let clientsInRoom = io.sockets.adapter.rooms[room];
        let numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
        // console.log('Room ' + room + ' now has ' + numClients + ' client(s)');

        if (numClients === 0) {
            socket.join(room);
            socket.emit('created', room, socket.id);
            // console.log('Client ID ' + socket.id + ' created room ' + room);
        } else if (numClients === 1) {
            // io.sockets.in(room).emit('join', room);
            socket.join(room);
            socket.emit('joined', room, socket.id);
            io.sockets.in(room).emit('ready', room);
            socket.broadcast.emit('ready', room);
            // console.log('Client ID ' + socket.id + ' joined room ' + room);
        } else {
            // max two clients
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
})

httpServer.listen(5000, () => {
    console.log(`Server started on port 5000 :)`);
});
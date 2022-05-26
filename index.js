const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const { v4: uuidv4 } = require('uuid');

const app = express();

const port = process.env.PORT || 9000;

//initialize a http server
const server = http.createServer(app);

//start our server
server.listen(port, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

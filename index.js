const express = require("express");
const http = require("http");

const app = express();

const port = process.env.PORT || 9000;

//initialize a http server
const server = http.createServer(app);

//start our server
server.listen(port, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

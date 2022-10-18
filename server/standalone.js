const http = require('http');
const express = require('express');
const cors = require('cors');
const collab = require('./app');

const app = express();
app.use(cors());

var server;
server = http.createServer(app);  
let io =  collab.start(server, {allowUserRooms: true});

server.listen(3001);

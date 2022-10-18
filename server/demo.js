
const path = require('path');

const http = require('http');

const express = require('express');
const cors = require('cors');

const config = require('config');

const collab = require('./app');


const app = express();
app.use(cors());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({ limit: '25mb',extended: false }));
app.use(express.static(path.join(__dirname, '../dev/public')));

var server;
server = http.createServer(app);  
let io =  collab.start(server, {allowUserRooms: true});

server.listen(3000);

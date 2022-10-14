const fs = require('fs');
const path = require('path');

const http = require('http');

const express = require('express');
const cors = require('cors');

const config = require('config');

const collab = require('./collab');


exports.start = async function (server) {

  collab.start(server);
   
};

if (require.main === module) {
  
  const app = express();
  app.use(cors());
  app.use(express.json({limit: '25mb'}));
  app.use(express.urlencoded({ limit: '25mb',extended: false }));
  app.use(express.static(path.join(__dirname, '../dev/public')));

  var server;
  server = http.createServer(app);
  collab.start(server);
  
  server.listen(3000);

}

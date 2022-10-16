const { Server } = require("socket.io");
var io; 

let userinfo = [];
let rooms = [];
var totalusers = 0;

exports.start = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', (socket) => {
      totalusers++;
      let userId = socket.id;
      
      socket.on('disconnect', () => {
        totalusers--;
        console.log('User disconnected. Total users:' + totalusers);
        if (userinfo[socket.id] != undefined) {
          sendUserList(socket);
          if (rooms[userinfo[socket.id].roomname].lockedMaster == socket.id) {
            rooms[userinfo[socket.id].roomname].lockedMaster = "";
          }
        }
        sendToRoom(socket, 'disconnected', socket.id);
        delete userinfo[socket.id];
      });

      socket.on('joinroom', (msg) => {
        let joininfo = JSON.parse(msg);        
        console.log('a user connected:' + joininfo.username + " to " + joininfo.roomname + " at " + new Date() + ' Total users:' + totalusers);
        userinfo[socket.id] = joininfo;
        if (rooms[userinfo[socket.id].roomname] == undefined)
        {
          rooms[userinfo[socket.id].roomname] = {lockedMaster: ""};
        }
        
        socket.join(joininfo.roomname);
       
        sendUserList(socket);
        if (rooms[userinfo[socket.id].roomname].lockedMaster != "") {
          sendToUser(socket.id, "lockSession", rooms[userinfo[socket.id].roomname].lockedMaster);
        }

      });

      socket.on('hcmessage', (msg) => {
        sendToRoom(socket, 'hcmessage', msg);
      });



      socket.on('chatmessage', (msg) => {
        sendToRoom(socket, 'chatmessage', msg);
      });

      socket.on('run', (msg) => {
        sendToRoom(socket, 'run', msg);
      });

     
      socket.on('lockSession', (msg) => {
        rooms[userinfo[socket.id].roomname].lockedMaster = socket.id;
        sendToRoom(socket, 'lockSession', socket.id);
      });

      socket.on('unlockSession', (msg) => {
        rooms[userinfo[socket.id].roomname].lockedMaster = "";
        sendToRoom(socket, 'unlockSession', msg);
      });
         
   
    });
};


function getUserList(socket) {
  let roomname = userinfo[socket.id].roomname;
  let userset = io.sockets.adapter.rooms.get(roomname);

  let userlist = [];
  if (userset != undefined) {
      for (let item of userset) {
          userlist.push({ username: userinfo[item].username, id: item });
      }
  }

  return userlist;

}


function sendUserList(socket) {
    let users = getUserList(socket);
    sendToRoomIncludingMe(socket, "userlist", JSON.stringify({user:socket.id, roomusers: users}));
}

function sendToUser(user, msgtype, msg)
{
    io.to(user).emit(msgtype, msg);
}



function sendToRoomIncludingMe(socket, msgtype, msg) {
  if (userinfo[socket.id] && userinfo[socket.id].roomname) {
    let room = userinfo[socket.id].roomname;
    io.to(room).emit(msgtype, msg);
  }
}


function sendToRoom(socket, msgtype, msg) {
  if (userinfo[socket.id] && userinfo[socket.id].roomname) {
    let room = userinfo[socket.id].roomname;
    socket.to(room).emit(msgtype, msg);
  }
}
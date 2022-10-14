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
          sendUserList(socket, userinfo[socket.id].roomname);
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
       
        sendUserList(socket, userinfo[socket.id].roomname);
        resendEditText(socket, userinfo[socket.id].roomname);
        if (rooms[userinfo[socket.id].roomname].lockedMaster != "") {
          sendToUser(socket.id, "lockSession", rooms[userinfo[socket.id].roomname].lockedMaster);
        }

      });


      socket.on('chatmessage', (msg) => {
        sendToRoom(socket, 'chatmessage', msg);
      });

      socket.on('run', (msg) => {
        sendToRoom(socket, 'run', msg);
      });

      socket.on('camera', (msg) => {
        sendToRoom(socket, 'camera', msg);
      });

      socket.on('cuttingsection', (msg) => {
        sendToRoom(socket, 'cuttingsection', msg);
      });


      socket.on('maximizebrowser', (msg) => {
        sendToRoom(socket, 'maximizebrowser', msg);
      });

      socket.on('explodemagnitude', (msg) => {
        sendToRoom(socket, 'explodemagnitude', msg);
      });


      socket.on('minimizebrowser', (msg) => {
        sendToRoom(socket, 'minimizebrowser', msg);
      });


      socket.on('activatemarkupview', (msg) => {
        sendToRoom(socket, 'activatemarkupview', msg);
      });

      socket.on('lockSession', (msg) => {
        rooms[userinfo[socket.id].roomname].lockedMaster = socket.id;
        sendToRoom(socket, 'lockSession', socket.id);
      });

      socket.on('unlockSession', (msg) => {
        rooms[userinfo[socket.id].roomname].lockedMaster = "";
        sendToRoom(socket, 'unlockSession', msg);
      });


      socket.on('selection', (msg) => {
        sendToRoom(socket, 'selection', msg);
      });

      socket.on('startcall', (msg) => {
        sendToRoom(socket, 'startcall', msg);
      });

      
      socket.on('startshare', (msg) => {
        sendToRoom(socket, 'startshare', msg);
      });

      socket.on('visibility', (msg) => {
        sendToRoom(socket, 'visibility', msg);
      });

      socket.on('isolate', (msg) => {
        sendToRoom(socket, 'isolate', msg);
      });

      socket.on('cadview', (msg) => {
        sendToRoom(socket, 'cadview', msg);
      });

      socket.on('matrix', (msg) => {
        sendToRoom(socket, 'matrix', msg);
      });

      socket.on('markup', (msg) => {
        sendToRoom(socket, 'markup', msg);
      });

      socket.on('resetvisibilities', (msg) => {
        sendToRoom(socket, 'resetvisibilities', msg);
      });

      socket.on('reset', (msg) => {
        sendToRoom(socket, 'reset', msg);
      });

      socket.on('clear', (msg) => {
        sendToRoom(socket, 'clear', msg);
      });

      socket.on('loadsubtree', (msg) => {
        sendToRoom(socket, 'loadsubtree', msg);
      });

      
      socket.on('setdrawmode', (msg) => {
        sendToRoom(socket, 'setdrawmode', msg);
      });

      socket.on('setprojectionmode', (msg) => {
        sendToRoom(socket, 'setprojectionmode', msg);
      });


      
      socket.on('editorselectionchanged', (msg) => {
        sendToRoom(socket, 'editorselectionchanged', msg);
      });

      socket.on('changed', (msg) => {
        sendToRoom(socket, 'changedmessage', msg);
      });
    });
};


function sendUserList(socket, roomname) {
    let userset = io.sockets.adapter.rooms.get(roomname);

    let userlist = [];
    if (userset != undefined) {
        for (let item of userset) {
            userlist.push({ username: userinfo[item].username, id: item });
        }
    }

    sendToRoomIncludingMe(socket, "userlist", JSON.stringify(userlist));

}

function resendEditText(socket, roomname) {
  let userset = io.sockets.adapter.rooms.get(roomname);

  if (userset != undefined) {
    for (let item of userset) {
      if (item != socket.id) {
        {
          sendToUser(item, "resendedittext", "");
          break;
        }
      }
    }
  }
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
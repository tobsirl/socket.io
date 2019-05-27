const express = require('express');
const app = express();
const socketio = require('socket.io');

let namespaces = require('./data/namespaces');

// console.log(namespaces);

// use the static files in public
app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);

const io = socketio(expressServer);

io.on('connection', socket => {
  //  build an array to send back with the img and endpoint for each namespace
  let nsData = namespaces.map(namespace => {
    return {
      img: namespace.img,
      endpoint: namespace.endpoint
    };
  });
  // console.log(nsData);
  // send the namespace data back to the client.
  // we need to use socket, not io, because we want it to
  // go to just this client
  socket.emit('namespaceList', nsData);
});

// loop through each namespace and listen for a connection
namespaces.forEach(namespace => {
  // console.log(namespace.endpoint);
  io.of(namespace.endpoint).on('connection', nsSocket => {
    console.log(`${nsSocket.id} has joined ${namespace.endpoint}`);
    // A socket has connnected to one of our chatgroup namespaces
    // send that ns group info back
    nsSocket.emit('nsRoomLoad', namespaces[0].rooms);
    nsSocket.on('joinRoom', (roomToJoin, numberOfUsersCallback) => {
      // deal with history... once we have it
      nsSocket.join(roomToJoin);
      // io.of('/wiki')
      //   .in(roomToJoin)
      //   .clients((error, clients) => {
      //     console.log(clients.length);
      //     numberOfUsersCallback(clients.length);
      //   });
      const nsRoom = namespaces[0].rooms.find(room => {
        return room.roomTitle === roomToJoin;
      });
      nsSocket.emit('historyCatchUp', nsRoom.history);
      // Send back the number of users in this room to ALL sockets connected to this room
      io.of('/wiki')
        .in(roomToJoin)
        .clients((error, clients) => {
          // console.log(clients.length);
          io.of('/wiki').in(roomToJoin).emit('updateMembers', clients.length)
        });
    });
    nsSocket.on('newMessageToServer', msg => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: 'ptobin',
        avatar: 'https://via.placeholder.com/30'
      };
      console.log(fullMsg);
      // send this message to all the sockets that are in the room that this socket is in
      // how do we find out what rooms this socket is in?
      console.log(nsSocket.rooms);
      // the user will be in the 2nd room in the object list
      // this is because the socket ALWAYS joins its own room on connection
      // get the keys
      const roomTitle = Object.keys(nsSocket.rooms)[1];
      // we need to find the Room object for this room
      const nsRoom = namespaces[0].rooms.find(room => {
        return room.roomTitle === roomTitle;
      });
      console.log(nsRoom);
      nsRoom.addMessage(fullMsg);
      io.of('/wiki')
        .to(roomTitle)
        .emit('messageToClients', fullMsg);
    });
  });
});

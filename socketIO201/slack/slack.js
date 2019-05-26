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
      io.of('/wiki')
        .in(roomToJoin)
        .clients((error, clients) => {
          console.log(clients.length);
          numberOfUsersCallback(clients.length);
        });
    });
  });
});

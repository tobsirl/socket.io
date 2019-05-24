const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);
io.on('connection', socket => {
  socket.emit('messageFromServer', { data: 'Welcome to the socketio server' });
  socket.on('messageToServer', dataFromClient => {
    console.log(dataFromClient);
  });

  io.of('/admin').on('connection', socket => {
    console.log('Someone connected to the admin namespace!');
    io.of('/admin').emit('welcome', 'Welcome to the admin channel!');
  });
});

// we need http because we don't have express
const http = require('http');

// we need socket.io
const socketio = require('socket.io');

// we make a http server with node
const server = http.createServer((req, res) => {
  res.end('I am connected');
});

const io = socketio(server);

io.on('connection', (socket, req) => {
  socket.emit('welcome', 'Welcome to the websocket server!!!');
  socket.on('message', msg => {
    console.log(msg);
  });
});

server.listen(8000);

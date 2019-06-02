const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/perfData', { useNewUrlParser: true });

const Machine = require('./models/Machine.js');

function socketMain(io, socket) {
  let macA;
  // console.log('A socket connected!', socket.id);

  socket.on('clientAuth', key => {
    if (key === 'sdpoise23423') {
      // valid node client
      socket.join('clients');
    } else if (key === 'auhnfas34234') {
      // valid ui client has joined
      socket.join('ui');
    } else {
      // an invalid client has joined. Goodbye
      socket.disconnet(true);
    }
  });

  // a machine has connected, check to see if it's new.
  // if it is, add it
  socket.on('initPerfData', data => {
    data.macA
  });

  socket.on('perfData', data => {
    console.log(data);
  });
}

module.exports = socketMain;

function socketMain(io, socket) {
  // console.log('A socket connected!', socket.id);

  socket.on('clientAuth', key => {
    if (key === sdpoise23423) {
      // valid node client
      socket.join('clients');
    } else if (key === 'auhnfas34234') {
      // valid ui client has joined
      socket.join('ui');
    } else {
      // an invalid client has joined. Goodbye
      socket.disconnet(true)
    }
  });
  socket.on('perfData', data => {
    console.log(data);
  });
}

module.exports = socketMain;

let socket = io.connect('http://localhost:8080');

// this function is called when the user clicks on the play solo button
function init() {
  draw();
  // console.log(orbs);
  // call the init event when the client is ready for the orbs
  socket.emit('init', {
    playerName: player.name
  });
}

socket.on('initReturn', data => {
  orbs = data.orbs
  setInterval(() => {
    
  }, 33);
});

socket.on('tock', data => {
  console.log(data);
  players = data.players;
});

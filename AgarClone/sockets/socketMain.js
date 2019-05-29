// Where all our main socket stuff will go
const io = require('../servers').io;

// import the Orb class
const Orb = require('./classes/Orb');
let orbs = [];
let settings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defualtSize: 6,
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500
};

initGame();

io.sockets.on('connection', socket => {
  // a player has connected
  // make a playerConfig object
  // let playerConfig = new playerConfig()
  // make a playerData object
  // let playerData = new playerData()
  // make a master player object to hold both
  // let player = new player(socket.id, playerConfig, playerData)
  socket.emit('init', {
    orbs
  });
});

// run at the beginning of a new game
function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;

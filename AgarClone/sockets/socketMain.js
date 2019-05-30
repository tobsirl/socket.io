// Where all our main socket stuff will go
const io = require('../servers').io;

// import the classes
const Orb = require('./classes/Orb');
const Player = require('./classes/Player');
const PlayerData = require('./classes/PlayerData');
const PlayerConfig = require('./classes/PlayerConfig');

let orbs = [];
let players = [];
let settings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defualtSize: 6,
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500
};

initGame();

// issue a message to EVERY connected socket 30 fps
setInterval(() => {
  if (players.length > 0) {
    io.to('game').emit('tock', {
      players
    });
  }
}, 33); //there are 30 33s in 1000 milliseconds, or 1/30th of a second, or 1 of 30fps

io.sockets.on('connection', socket => {
  // a player has connected
  socket.on('init', data => {
    // add the player to the game namespace
    socket.join('game');
    // make a playerConfig object
    let playerConfig = new PlayerConfig(settings);
    // make a playerData object
    let playerData = new PlayerData(data.playerName, settings);
    // make a master player object to hold both
    let player = new Player(socket.id, playerConfig, playerData);
    socket.emit('initReturn', {
      orbs
    });
    players.push(playerData);
  });
});

// run at the beginning of a new game
function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;

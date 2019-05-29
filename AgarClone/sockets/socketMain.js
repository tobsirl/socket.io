// Where all our main socket stuff will go
const io = require('../servers').io;

// import the Orb class
const Orb = require('./classes/Orb');

// run at the beginning of a new game
function initGame() {
  for (let i = 0; i < 500; i++) {
    orbs.push(new Orb());
  }
}

module.exports = io;

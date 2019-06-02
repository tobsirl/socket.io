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
    // update our socket connect function scoped variable
    macA = data.macA;
    // now go check mongo!
    checkAndAdd(data);
  });

  socket.on('perfData', data => {
    console.log(data);
  });
}

function checkAndAdd(data) {
  // because we are doing db stuff, js won't wait for the db
  // so we need to make this a promise
  return new Promise((resolve, reject) => {
    Machine.findOne({ macA: data.macA }, (err, doc) => {
      if (err) {
        throw err;
        reject(err);
      } else if (doc === null) {
        // the record is not in the db, so add it!
        let newMachine = new Machine(data);
        newMachine.save(); // save it to the database
        resolve('added');
      } else {
        // it is in the db just resolve
        resolve('found');
      }
    });
  });
}

module.exports = socketMain;

function joinRoom(roomName) {
  // send this roomName to the server!
  nsSocket.emit('joinRoom', roomName, newNumberofMembers => {
    // we want to update the room member total now that we have joined!
    document.querySelector(
      '.curr-room-num-users'
    ).innerHTML = `${newNumberofMembers} <span class="glyphicon glyphicon-user"></span>`;
  });
}

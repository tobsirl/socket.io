function joinRoom(roomName) {
  // send this roomName to the server!
  nsSocket.emit('joinRoom', roomName, newNumberofMembers => {
    // we want to update the room member total now that we have joined!
    document.querySelector(
      '.curr-room-num-users'
    ).innerHTML = `${newNumberofMembers} <span class="glyphicon glyphicon-user"></span>`;
  });

  nsSocket.on('historyCatchUp', history => {
    // console.log(history);
    const messagesUl = document.querySelector('#messages');
    messagesUl.innerHTML = '';
    history.forEach(msg => {
      const newMsg = buildHTML(msg);
      const currentMessages = messagesUl.innerHTML;
      messagesUl.innerHTML = currentMessages + newMsg;
    });
  });
}

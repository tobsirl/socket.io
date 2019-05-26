function joinNs(endpoint) {
  const nsSocket = io(`http://localhost:9000${endpoint}`);
  nsSocket.on('nsRoomLoad', nsRooms => {
    // console.log(nsRooms);
    let roomList = document.querySelector('.room-list');
    roomList.innerHTML = '';
    nsRooms.forEach(room => {
      let glyph;
      if (room.private) {
        glyph = 'lock';
      } else {
        glyph = 'globe';
      }
      roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${
        room.roomTitle
      }</li>`;
    });
    //Add a click listerer to each room
    let roomNodes = document.getElementsByClassName('room');
    Array.from(roomNodes).forEach(el => {
      el.addEventListener('click', e => {
        console.log(`Someone clicked on ${e.target.innerText}`);
      });
    });

    // add room automatically... first time here
    const topRoom = document.querySelector('.room');
    const topRoomName = topRoom.innerText;
    // console.log(topRoomName);
    joinRoom(topRoomName);
  });

  nsSocket.on('messageToClients', msg => {
    console.log(msg);
    document.querySelector('#messages').innerHTML += `<li>${msg.text}<\li>`;
  });

  document.querySelector('.message-form').addEventListener('submit', event => {
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    socket.emit('newMessageToServer', { text: newMessage });
  });
}

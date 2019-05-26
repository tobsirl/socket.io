function joinNs(endpoint) {
  nsSocket = io(`http://localhost:9000${endpoint}`);
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
    const newMsg = buildHTML(msg);
    document.querySelector('#messages').innerHTML += newMsg;
  });

  document.querySelector('.message-form').addEventListener('submit', event => {
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    nsSocket.emit('newMessageToServer', { text: newMessage });
  });
}

function buildHTML(msg) {
  const newHTML = `
  <li>
          <div class="user-image">
            <img src="${msg.avatar}" />
          </div>
          <div class="user-message">
          <div class="user-name-time">${msg.username}<span>${
    msg.time
  }</span></div>
            <div class="message-text">${msg.text}</div>
          </div>
  </li>
  `;
  return newHTML;
}

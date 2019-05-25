const socket = io('http://localhost:9000');

// listen for namespaceList, which is a list of all the namespaces
socket.on('namespaceList', nsData => {
  console.log(`The list of namespaces has arrived!`);
  // console.log(nsData);
  let namespacesDiv = document.querySelector('.namespaces');
  namespacesDiv.innerHTML = '';
  nsData.forEach(namespace => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${
      namespace.endpoint
    }><img src="${namespace.img}"></div>`;
  });

  // Add a clicklistener for each namespace
  Array.from(document.getElementsByClassName('namespace')).forEach(element => {
    // console.log(element);
    element.addEventListener('click', e => {
      const nsEndpoint = element.getAttribute('ns');
      console.log(`${nsEndpoint} I should go to now`);
    });
  });

  const nsSocket = io('http://localhost:9000/wiki');
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
      roomList.innerHTML += `<li><span class="glyphicon glyphicon-${glyph}"></span>${
        room.roomTitle
      }</li>`;
    });
    //Add a click listerer to each room
  });
});

socket.on('messageFromServer', dataFromServer => {
  console.log(dataFromServer);
  socket.emit('messageToServer', { data: 'Data from the Client!' });
});

document.querySelector('#message-form').addEventListener('submit', event => {
  event.preventDefault();
  const newMessage = document.querySelector('#user-message').value;
  socket.emit('newMessageToServer', { text: newMessage });
});

socket.on('messageToClients', msg => {
  console.log(msg);
  document.querySelector('#messages').innerHTML += `<li>${msg.text}<\li>`;
});

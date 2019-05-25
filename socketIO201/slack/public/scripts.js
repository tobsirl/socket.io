const socket = io('http://localhost:9000');

// listen for namespaceList, which is a list of all the namespaces
socket.on('namespaceList', nsData => {
  console.log(`The list of namespaces has arrived!`);
  // console.log(nsData);
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

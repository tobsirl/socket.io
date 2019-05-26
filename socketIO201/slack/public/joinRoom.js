function joinRoom(roomName) {
  // send this roomName to the server!
  nsSocket.emit('joinRoom', roomName)
  
}
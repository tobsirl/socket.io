const socket = io('http://localhost:9000');

// listen for namespaceList, which is a list of all the namespaces
socket.on('namespaceList', nsData => {
  console.log(`The list of namespaces has arrived!`);
  console.log(nsData);
  let namespacesDiv = document.querySelector('.namespaces');
  namespacesDiv.innerHTML = '';
  nsData.forEach(namespace => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${
      namespace.endpoint
    }><img src="${namespace.img}"></div>`;
  });

  // Add a clicklistener for each namespace
  Array.from(document.getElementsByClassName('namespace')).forEach(element => {
    console.log(element);
    element.addEventListener('click', e => {
      const nsEndpoint = element.getAttribute('ns');
      console.log(`${nsEndpoint} I should go to now`);
      joinNs(nsEndpoint);
    });
  });

  joinNs('/wiki');
});

let wHeight = $(window).height();
let wWidth = $(window).width();
let player = {}; // This is all things "this" player

let canvas = document.querySelector('#the-canvas');
let context = canvas.getContext('2d');
canvas.Width = wWidth;
canvas.Height = wHeight;

$(window).load(() => {
  $('#loginModal').modal('show');
});

$('.name-form').submit(event => {
  event.preventDefault();
  console.log('Submitted!');
  player.name = document.querySelector('#name-input').value;
  $('#loginModal').modal('hide');
  $('#spawnModal').modal('show');
  document.querySelector('.player-name').innerHTML = player.name;
});

$('.start-game').click(() => {
  $('.modal').modal('hide');
  $('.hiddenOnStart').removeAttr('hidden');
  init();
});

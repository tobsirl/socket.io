function init() {
  draw();
}

// ===========================
// ===========draw============
// ===========================
let randomX = Math.floor(500 * Math.random() + 10);
let randomY = Math.floor(500 * Math.random() + 10);
function draw() {
  console.log(randomX);
  context.beginPath();
  context.fillStyle = 'rgb(255,0,0)';
  // arg 1, 2 = x, y of the center of the arc
  // arg 3 = radius
  // arg 4 = where to start on the circle in radians, 0 = 3:00
  // arg 5 = where to stop in radians
  context.arc(randomX, randomY, 10, 0, Math.PI * 2);
  context.fill();
  context.lineWidth = 3;
  context.strokeStyle = 'rgb(0,255,0)';
  context.stroke();
  requestAnimationFrame(draw);
}

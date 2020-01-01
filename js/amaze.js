//a few globals
var dimensions = 35;
var pixels;
var cells;
var start;
var end;
var path;

function round(value) { return (value + 0.5) | 0; }

//show the maze
var draw = function () {
  var canvas = document.getElementById('maze');
  var context = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

    //fill
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  //draw the maze
  pixels = Math.min(canvas.width, canvas.height); 
  var scale = pixels / dimensions;
  var line = function(x1, y1, x2, y2) { context.moveTo(x1 + .5, y1 + .5); context.lineTo(x2 + .5, y2 + .5); };
  context.scale(scale,scale);
  context.strokeStyle = 'white';
  context.lineCap = 'square';
  context.lineJoin = 'miter';
  context.lineWidth = .75;
  cells.forEach(function(column, x) {
    column.forEach(function(row, y) {
      context.beginPath();
      if(row & 1) line(x, y, x - 1, y);
      if(row & 2) line(x, y, x + 1, y);
      if(row & 4) line(x, y, x, y - 1);
      if(row & 8) line(x, y, x, y + 1);
      context.stroke();
      context.closePath;
    });
  });
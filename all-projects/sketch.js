function setup() {
  max_x = 280;
  max_y = 280;
  x_dir = 2;
  y_dir = 2;
  object_width = 20
  createCanvas (max_x + object_width, max_y + object_width);
  background (50);
  fill (200);
  x = 40;
  y = 10;
  rect (x, y, 20, 20);

  // set up player 1
  p1_x = 0;
  p1_y = max_y / 2;
  drawPlayer1(p1_x, p1_y);
  
  // set up player 2
  p2_x = max_x + object_width / 2;
  p2_y = max_y / 2;
  drawPlayer1(p2_x, p2_y);

}   

function drawPlayer1(p1_x, p1_y) {
  rect (p1_x, p1_y, 10, 40);
}

function drawPlayer2(p1_x, p1_y) {
  rect (p1_x, p1_y, 10, 40);
}

function draw() {
  x += x_dir;
  y += y_dir;
  if (x >= max_x || x <= 0) {
    x_dir *= -1;
  }
  if (y >= max_y || y <= 0) {
    y_dir *= -1;
  }
  background (50);
  rect (x, y, 20, 20);

  drawPlayer1(p1_x, p1_y);
  drawPlayer2(p2_x, p2_y);
} 
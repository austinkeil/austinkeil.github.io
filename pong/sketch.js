function setup() {
  PLAYER_SPEED = 4;
  PLAYER_WIDTH = 10;
  PLAYER_HEIGHT = 40;
  BALL_HEIGHT = PLAYER_HEIGHT/2;
  BALL_SPEED = PLAYER_SPEED/2;

  CANVAS_WIDTH = 400;
  CANVAS_HEIGHT = 400; 

  GREEN_WIDTH = CANVAS_WIDTH/2;

  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(100);

  p1 = new Player(PLAYER_SPEED, 'left', PLAYER_HEIGHT, PLAYER_WIDTH, CANVAS_WIDTH, CANVAS_HEIGHT);
  p2 = new Player(PLAYER_SPEED, 'right', PLAYER_HEIGHT, PLAYER_WIDTH, CANVAS_WIDTH, CANVAS_HEIGHT);
  ball = new Ball(BALL_SPEED, BALL_HEIGHT);
}   

function draw() {
  background(100);
  fill (100, 255, 50);
  rect(0,0,GREEN_WIDTH,CANVAS_HEIGHT);

  fill (255, 100, 50);
  rect(GREEN_WIDTH,0,GREEN_WIDTH,CANVAS_HEIGHT);

  p1.drawPlayer();
  p2.drawPlayer();
  ball.drawBall();
}

class Ball {
  constructor(speed, side_length) {
    this.speed = speed;
    this.side_length = side_length;
    this.x_pos = 20;
    this.y_pos = 20;
    this.x_dir = 1;
    this.y_dir = 1;
  }

  updatePosition() {
    this.x_pos += this.x_dir * this.speed;
    this.y_pos += this.y_dir * this.speed;
  }

  drawBall() {
    this.updatePosition();
    fill(100);
    rect(this.x_pos, this.y_pos, this.side_length, this.side_length);
  }
}

class Player {
  constructor(speed, id, height, width, max_x, max_y) {
    this.speed = speed;
    this.id = id;
    this.height = height;
    this.width = width;
    this.max_x = max_x;
    this.max_y = max_y;
    if (id == 'left') {
      this.x_pos = 0;
    } else {
      this.x_pos = max_x - width;
    }
    this.y_pos = max_y / 2 - height / 2;
    this.drawPlayer();
  }

  drawPlayer() {
    this.updatePosition();
    fill(100);
    rect(this.x_pos, this.y_pos, this.width, this.height);
  }

  updatePosition() {
    if (this.id == 'left' && keyIsPressed) {
      if (keyCode == 119 && this.y_pos > 0) {
        console.log('moving up')
        this.y_pos -= this.speed;
      }
      if (keyCode == 115 && this.y_pos < this.max_y - this.height) {
        console.log('moving down')
        this.y_pos += this.speed;
      }
    } else if (this.id == 'right' && keyIsPressed) {
      if (keyCode == UP_ARROW && this.y_pos > 0) {
        this.y_pos -= this.speed;
      }
      if (keyCode == DOWN_ARROW && this.y_pos < this.max_y - this.height) {
        this.y_pos += this.speed;
      }
    }
  }
}
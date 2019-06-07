function setup() {
  PLAYER_SPEED = 4;
  PLAYER_WIDTH = 10;
  PLAYER_HEIGHT = 40;
  BALL_HEIGHT = PLAYER_HEIGHT/2;
  BALL_SPEED = PLAYER_SPEED;
  RANDOMNESS = random() + 0.9;


  p1Score = 0;
  p2Score = 0;

  CANVAS_WIDTH = 400;
  CANVAS_HEIGHT = 400; 

  GREEN_WIDTH = CANVAS_WIDTH/2;

  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(100);

  ball = new Ball(BALL_SPEED, BALL_HEIGHT);
  p1 = new Player(PLAYER_SPEED, 'left', PLAYER_HEIGHT, PLAYER_WIDTH, CANVAS_WIDTH, CANVAS_HEIGHT);
  p2 = new Player(PLAYER_SPEED, 'right', PLAYER_HEIGHT, PLAYER_WIDTH, CANVAS_WIDTH, CANVAS_HEIGHT);
}   

function draw() {
  background(100);
  fill (100, 255, 50);
  rect(0,0,GREEN_WIDTH,CANVAS_HEIGHT);
  fill (255, 100, 50);
  rect(GREEN_WIDTH,0,GREEN_WIDTH,CANVAS_HEIGHT);

  fill(0);
  text ('Player 1: ' + p1Score, 10, CANVAS_HEIGHT/16);
  text ('Player 2: ' + p2Score, CANVAS_WIDTH/2 + 10, CANVAS_HEIGHT/16);

  
  ball.drawBall();
  p1.drawPlayer();
  p2.drawPlayer();
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
    if (this.x_pos >= CANVAS_WIDTH - p2.width - BALL_HEIGHT) {
      if (this.y_pos + BALL_HEIGHT > p2.y_pos && this.y_pos < p2.y_pos + PLAYER_HEIGHT) {
        this.x_dir *= -1 * RANDOMNESS;
        this.y_dir *= RANDOMNESS;
      } else {
        p1Score += 1;
        this.restart();
      }
    } else if (this.x_pos <= p1.x_pos + PLAYER_WIDTH) {
      if (this.y_pos + BALL_HEIGHT > p1.y_pos && this.y_pos < p1.y_pos + PLAYER_HEIGHT) {
        this.x_dir *= -1 * RANDOMNESS;
        this.y_dir *= RANDOMNESS;
      } else {
        p2Score += 1;
        this.restart();
      }
    }

    if (this.y_pos >= CANVAS_WIDTH - BALL_HEIGHT) {
      this.y_dir *= -1;
    }

    if (this.y_pos <= 0) {
      this.y_dir *= -1;
    }
    this.x_pos += this.x_dir * this.speed;
    this.y_pos += this.y_dir * this.speed;

  }

  restart() {
    this.x_pos = CANVAS_WIDTH/4;
    this.y_pos = CANVAS_HEIGHT/4;
    this.x_dir = 1;
    this.y_dir = random();
  }

  drawBall() {
    this.updatePosition();
    fill(100);
    ellipse(this.x_pos, this.y_pos, this.side_length, this.side_length);
  }
}

class Player {
  constructor(speed, id, height, width, max_x, max_y) {
    this.id = id;
    this.height = height;
    this.width = width;
    this.max_x = max_x;
    this.max_y = max_y;
    if (id == 'left') {
      this.x_pos = 0;
      this.speed = speed * 2;
    } else {
      this.speed = speed;
      this.x_pos = max_x - width;
    }
    this.y_pos = max_y / 2 - height / 2;
  }

  drawPlayer() {
    this.updatePosition();
    fill(100);
    rect(this.x_pos, this.y_pos, this.width, this.height);
  }

  updatePosition() {
    if (this.id == 'right' && keyIsPressed) {
      if (keyCode == UP_ARROW && this.y_pos > 0) {
        this.y_pos -= this.speed;
      }
      if (keyCode == DOWN_ARROW && this.y_pos < this.max_y - this.height) {
        this.y_pos += this.speed;
      }
    } else if (this.id == 'left') {
      let r = random();
      if (r > .5) {
        if (ball.y_pos > this.y_pos) {
          this.y_pos += this.speed;
        } else if (ball.y_pos - BALL_HEIGHT < this.y_pos) {
          this.y_pos -= this.speed;
        }
    }
    }
  }
}
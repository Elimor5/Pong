
const compScoreboard = document.getElementById("comp-scoreboard");
const humanScoreboard = document.getElementById("human-scoreboard");

class Vector {
  constructor( x = 0, y = 0 ) {
    this.x = x;
    this.y = y;
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  setLength() {
    const factor = value / this.getLength;
    this.x *= factor;
    this.y *= factor;
  }
}

class Rectangle {
  constructor(w,h, x = 0, y = 0) {
    this.pos = new Vector(x, y);
    this.size = new Vector(w,h);
    this.width = w;
    this.height = h;
  }

  createBoard(ctx) {
    // // ctx.fillStyle = "gray";
    // ctx.fillRect(0, 0, this.width, this.height);
    // ctx.strokeStyle = "orange";
    // ctx.strokeRect(0,0, this.width, this.height);
  }

  createBasketballCourt(ctx) {
    const img = new Image();
    image.src = "https://thumb7.shutterstock.com/display_pic_with_logo/605593/122234311/stock-photo-basketball-court-parquet-122234311.jpg";
    ctx.drawImage(image, this.width,this.height);
  }

  createPaddle(ctx) {

    ctx.fillStyle = "white";
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.strokeStyle="orange";
    ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
  }

}

class Player extends Rectangle {
  constructor(x,y) {
    super(20,100, x, y);
    this.score = 0;
  }
}

class Ball {
  constructor(r, velX, velY) {
    this.pos = new Vector(300,200);
    this.radius = r;
    this.velocity = new Vector(velX, velY);
    this.div = document.getElementById("ball");
  }

  createBall(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI, true);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
  }

  createball() {
    this.div.style.top = `${this.pos.y}px`;
    this.div.style.left = `${this.pos.x}px`;
  }

  changeBall(i) {
    const ballTypes = [
      {
        background: 'url("img/background/volleyball_court.png")',
        ballType: 'url("./img/volleyball.gif")',
        xVel: 430,
        yVel: 250,
      },
      {
        background: 'url("img/background/basketball_court.png")',
        ballType: 'url("./img/basketball.gif")',
        xVel: 450,
        yVel: 250,
      },
      {
        background: 'url("img/background/soccer_field.png")',
        ballType: 'url("./img/soccer_ball.gif")',
        xVel: 420,
        yVel: 100,
      },
      {
        background: 'url("img/background/football_field.jpg")',
        ballType: 'url("./img/football.gif")',
        xVel: 300,
        yVel: 850,
      }
    ];

    return ballTypes[i];
  }

  // changeBall() {
  //   const balls = [];
  //   this.div.style.background-image = "url('./img/basketball.gif')";
  // }
}

class Pong {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.board = new Rectangle(this.canvas.width, this.canvas.height);
    this.computer = new Player(15, this.canvas.height / 2);
    this.human = new Player(this.canvas.width - 35, this.canvas.height / 2);
    this.ballType = 0;
    this.ball = new Ball(30, 250, 250);
    this.paused = true;
    this.update(0.01);
    let lastTime = 0;
    const callback = (milliseconds) => {
      if (lastTime && !this.paused) {

        this.update((milliseconds - lastTime) / 1000); //reconvert back to seconds
      }

      lastTime = milliseconds;

        setTimeout(() => requestAnimationFrame(callback), 1000/34);

    };
    callback(1000);
  }

  reset() {
    this.ball.pos.x = this.canvas.width / 2;
    this.ball.pos.y = this.canvas.height / 2;
    debugger
    this.ball.velocity.x = this.ball.changeBall(this.ballType % 4).xVel * (Math.random() > 0.5 ? 1 : -1);
    this.ball.velocity.y = this.ball.changeBall(this.ballType % 4).yVel * (Math.random() - 0.5 ? 1 : -1);

    this.canvas.style['background-image'] = this.ball.changeBall(this.ballType % 4).background;
    this.ball.div.style['background-image'] = this.ball.changeBall(this.ballType % 4).ballType;
    this.ballType++;

    this.update(0.01);
    this.paused = true;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.board.width, this.board.height);
    this.board.createBoard(this.ctx);
    this.ball.createball(this.ctx);

    this.computer.createPaddle(this.ctx);
    this.human.createPaddle(this.ctx);

    // this.players.forEach((player) => this.createRectangle(player));
  }

  maintainInBounds() {
    const {x,y} = this.ball.pos;
    const { radius } = this.ball;

    // if ( x < 0 + radius ) {
    //   if ( this.ball.velocity.x < 0 ) { this.ball.velocity.x = -this.ball.velocity.x;
    //   }
    // } else if ( x > this.canvas.width - radius ) {
    //     if (this.ball.velocity.x > 0 ) {this.ball.velocity.x = -this.ball.velocity.x; }
    // }

    if ( y < 0 + radius ) {
      if ( this.ball.velocity.y < 0 ) { this.ball.velocity.y = -this.ball.velocity.y;
      }
    } else if ( y > this.canvas.height - radius ) {
        if (this.ball.velocity.y > 0 ) { this.ball.velocity.y = -this.ball.velocity.y; }
    }
  }

  collision(object) {
    const  { x, y } = object.pos;

    const upperBound = y;
    const lowerBound = y + object.height;
    const leftBound = x;
    const rightBound = x + object.width;
    let ballPos;
    object === this.human ? ballPos = this.ball.pos.x + this.ball.radius : ballPos = this.ball.pos.x -  this.ball.radius

    if (( leftBound < ballPos &&  ballPos < rightBound) &&
        (upperBound < this.ball.pos.y  && this.ball.pos.y < lowerBound) ) {
      return true;
    }

  }

  calculateScore () {
    const {x,y} = this.ball.pos;
    const { radius } = this.ball;

    if ( x < 0 + radius ) {
      this.human.score++;
      humanScoreboard.innerHTML = this.human.score;
      console.log(this.human.score);
      this.reset();
    } else if ( x > this.canvas.width - radius ) {
      this.computer.score++;
      compScoreboard.innerHTML = this.computer.score;
      console.log("computer" + this.computer.score);
      this.reset();
    }


  }


  update(deltaTime) {
    //ball movement relative to time difference
    this.ball.pos.x += this.ball.velocity.x * deltaTime;
    this.ball.pos.y += this.ball.velocity.y * deltaTime;

    this.draw();
    this.maintainInBounds();
    this.calculateScore();

    if (this.collision(this.human) || this.collision(this.computer)) {

      this.ball.velocity.x = -this.ball.velocity.x;
      this.ball.velocity.x *= (1 + (Math.random() * .05));
      this.ball.velocity.y *= (1 + (Math.random() * .05));
      // console.log(this.ball.velocity.x);
      // console.log(this.ball.velocity.y);
    }

    this.computer.pos.y  = this.ball.pos.y * 0.8;
  }
}

  const canvas = document.getElementById("pong");
  const pong = new Pong(canvas);


  canvas.addEventListener(("mousemove"), (e) => {
    pong.human.pos.y = event.offsetY;
  });

  document.addEventListener(("keydown"),(e) => {
    if (e.keyCode === 38 && pong.human.pos.y > 0 ) {
      pong.human.pos.y -= 50;
    } else if (e.keyCode === 40 && pong.human.pos.y < canvas.height -115 ) {
      pong.human.pos.y += 50;
    } else if (e.keyCode !== 38 || e.keyCode !== 40 ) {
      pong.paused = !pong.paused;
    }

  });

  document.addEventListener(("click"),(e) => {
    pong.paused = !pong.paused;
  });
//key up - 38
//key down - 40

class Vector {
  constructor( x = 0, y = 0 ) {
    this.x = x;
    this.y = y;
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
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.strokeStyle = "orange";
    ctx.strokeRect(0,0, this.width, this.height);
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
    this.pos = new Vector(400,300);
    this.radius = r;
    this.velocity = new Vector(velX, velY);
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
}


class Pong {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.board = new Rectangle(this.canvas.width, this.canvas.height);
    this.computer = new Player(15, this.canvas.height / 2);
    this.human = new Player(this.canvas.width - 35, this.canvas.height / 2);

    this.ball = new Ball(10, 150, 150);
    this.paused = true;
    this.update(0.01)
    let lastTime = 0;
    const callback = (milliseconds) => {
      if (lastTime && !this.paused) {

        this.update((milliseconds - lastTime) / 1000); //reconvert back to seconds
      }

      lastTime = milliseconds;

        setTimeout(() => requestAnimationFrame(callback), 1000/100);

    };
    callback(1000);
  }

  reset() {
    this.ball.pos.x = 400;
    this.ball.pos.y = 300;
    this.ball.velocity.x = -150;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.board.width, this.board.height);
    this.board.createBoard(this.ctx);
    this.ball.createBall(this.ctx);
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
      console.log(this.human.score);
      this.reset();
    } else if ( x > this.canvas.width - radius ) {
      this.computer.score++;
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
      // this.ball.velocity.x *= 1.05;
      // this.ball.velocity.y *= 1.05;
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
    } else if (e.keyCode === 80) {
      pong.paused = !pong.paused;
    }
    console.log(pong.paused);
  });
//key up - 38
//key down - 40

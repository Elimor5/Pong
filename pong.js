
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


  createPaddle(ctx) {

    ctx.fillStyle = "white";
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.strokeStyle="orange";
    ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
  }

}

class Player extends Rectangle {
  constructor(x,y,name) {
    super(20,100, x, y);
    this.score = 0;
    this.velocity = 1;
    this.name = name;
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
        background: 'url("img/background/basketball_court2.png")',
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
    this.computer = new Player(15, this.canvas.height / 2, "Computer");
    this.human = new Player(this.canvas.width - 35, this.canvas.height / 2, "Player");
    this.ballType = 0;
    this.ball = new Ball(30, 250, 250);
    this.paused = true;
    this.update(0.01);
    this.collisions = 0;
    let lastTime = 0;
    const callback = (milliseconds) => {
      if (lastTime && !this.paused) {
        this.update((milliseconds - lastTime) / 1000); //reconvert back to seconds
      }
      lastTime = milliseconds;
      requestAnimationFrame(callback);
    };
    callback(1000);
  }

  reset() {
    this.ball.pos.x = this.canvas.width / 2;
    this.ball.pos.y = this.canvas.height / 2;
    this.ball.velocity.x = this.ball.changeBall(this.ballType % 4).xVel * (Math.random() > 0.5 ? 1 : -1);
    this.ball.velocity.y = this.ball.changeBall(this.ballType % 4).yVel * (Math.random() - 0.5 ? 1 : -1);

    this.canvas.style['background-image'] = this.ball.changeBall(this.ballType % 4).background;
    this.ball.div.style['background-image'] = this.ball.changeBall(this.ballType % 4).ballType;
    this.ballType++;

    this.update(0.01);
    this.paused = true;
    this.collisions = 0;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.board.width, this.board.height);
    this.ball.createball(this.ctx);
    this.computer.createPaddle(this.ctx);
    this.human.createPaddle(this.ctx);
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
    object === this.human ? ballPos = this.ball.pos.x + this.ball.radius : ballPos = this.ball.pos.x // -  this.ball.radius

    if ((( object === this.computer && rightBound  >= ballPos ) || (object === this.human && leftBound <= ballPos )) &&
        (upperBound - this.ball.radius < this.ball.pos.y  && this.ball.pos.y < lowerBound + this.ball.radius) ) {
          if (object === this.computer) {
            debugger
          }
          console.log(this.ball.pos.y + "ball pos");
          console.log(object.pos.y + "top of paddle");
          console.log(object.pos.y + object.height + "bottom of paddle");
          console.log(this.ball.velocity.x + "current ball velocity");
      this.collisions++;
      return true;
    }

  }

  compAI(deltaTime) {
    // const adjustmentFactor = this.collisions % 3 === 0 ? 0.7 : 1;
    // if ( this.computer.pos.y > this.ball.pos.y ) {
    //   this.computer.pos.y -= this.computer.velocity.y * deltaTime * adjustmentFactor;
    // } else {
    //   this.computer.pos.y += this.computer.velocity.y * deltaTime * adjustmentFactor;
    // }
    this.computer.pos.y = this.ball.pos.y * 1;
    if (this.collisions % 7 === 0) {
      this.computer.pos.y = this.ball.pos.y * 0.5;
    }
  }

  calculateScore() {
    const {x,y} = this.ball.pos;
    const { radius } = this.ball;

    if ( x < 0  ) {
      console.log("ball went out at" + this.ball.pos.y);
      console.log(this.computer.pos.y + "top paddle computer");
      console.log(this.ball.velocity.x + "ending speed")
      //in case ball goes through paddle
      // if ((this.computer.pos.y - this.ball.radius < this.ball.pos.y) && (this.computer.pos.y + this.computer.height + this.ball.radius > this.ball.pos.y)) {
      //   if (this.ball.velocity.x < 0) {
      //     this.ball.velocity.x = -this.ball.velocity.x;
      //   }
      // } else {
        this.human.score++;
        humanScoreboard.innerHTML = this.human.score;
        this.reset();
      // }
    } else if ( x > this.canvas.width ) {
        console.log(this.human.pos.y + "top paddle human");
        console.log("ball went out at" + this.ball.pos.y);
        console.log(this.ball.velocity.x + "ending speed")
        //in case ball goes through paddle
        // if ((this.human.pos.y < this.ball.pos.y) && (this.human.pos.y + this.human.height > this.ball.pos.y)) {
        //   if (this.ball.velocity.x > 0) {
        //     this.ball.velocity.x = -this.ball.velocity.x;
        //   }
        // } else {
          this.computer.score++;
          compScoreboard.innerHTML = this.computer.score;
          this.reset();
        // }
    }
  }

  modalView() {
    const modal = document.getElementById("modal");

    if (this.paused) {
      modal.classList.add("modal-open");
      modal.classList.remove("modal-closed");
    } else {
      modal.classList.remove("modal-open");
      modal.classList.add("modal-closed");
    }
  }

  gameOver() {
    if (this.computer.score === 10 || this.human.score === 10) {
        const winner = this.computer.score === 10 ? this.computer : this.human;
      const gameOverModal = document.getElementById("game-over-modal");
        gameOverModal.classList.remove("modal-closed");
        gameOverModal.classList.add("modal-open");
        document.getElementById("game-over-message").innerHTML = `${winner.name} wins!`;
        setTimeout(() =>{
          gameOverModal.classList.remove("modal-open");
          gameOverModal.classList.add("modal-closed");
        }, 3000);
        this.human.score = 0;
        humanScoreboard.innerhtml = this.human.score;
        this.computer.score = 0;
        compScoreboard.innerHTML = this.computer.score;

    }
  }

  update(deltaTime) {
    //ball movement relative to time difference
    this.ball.pos.x += this.ball.velocity.x * deltaTime;
    this.ball.pos.y += this.ball.velocity.y * deltaTime;

    this.draw();
    this.maintainInBounds();
    this.calculateScore();
    this.modalView();


      if (this.collision(this.human)) {
        console.log("human collision!");
        if (this.ball.velocity.x > 0) {
          this.ball.velocity.x = -this.ball.velocity.x * 1.1;
          this.ball.velocity.y = -this.ball.velocity.y * 1.1 * (Math.random() > 0.5 ? 1 : -1);
          this.computer.velocity *= 1;

          console.log("text");
        }
      } else if (this.collision(this.computer)) {
        console.log("computer collision!");
        console.log("computer vel" + this.computer.velocity);
        console.log("collisions" + this.collisions);
        if (this.ball.velocity.x < 0) {
          this.ball.velocity.x = -this.ball.velocity.x * 1.02;
          this.ball.velocity.y = -this.ball.velocity.y * 1.05 * (Math.random() > 0.5 ? 1 : -1);
          this.computer.velocity *= 1;

            console.log("text");
        }
      }
      this.compAI(deltaTime);
      this.gameOver();
  }
}

  const canvas = document.getElementById("pong");
  const pong = new Pong(canvas);
  const whitespace = document.getElementById("container");

  whitespace.addEventListener(("mousemove"), (e) => {
    if (e.offsetY -pong.human.height >= 0) {
      pong.human.pos.y = e.offsetY - pong.human.height;
    }
  });


  document.addEventListener(("keydown"),(e) => {
      pong.paused = !pong.paused;
      pong.modalView();
  });

  document.addEventListener(("click"),(e) => {
    pong.paused = !pong.paused;
    pong.modalView();
  });

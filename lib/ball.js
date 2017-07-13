import Vector from './vector.js';

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
}

export default Ball;  
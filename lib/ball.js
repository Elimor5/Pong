import Vector from './vector.js';

class Ball {
  constructor(r, velX, velY) {
    this.pos = new Vector(300,200);
    this.radius = r;
    this.velocity = new Vector(velX, velY);
    this.div = document.getElementById("ball");
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
        pausedBallType: 'url("./img/volleyball.jpg")',
        xVel: 450,
        yVel: 250,
      },
      {
        background: 'url("img/background/basketball_court2.png")',
        ballType: 'url("./img/basketball.gif")',
        pausedBallType: 'url("./img/basketball.jpg")',
        xVel: 450,
        yVel: 250,

      },
      {
        background: 'url("img/background/soccer_field.png")',
        ballType: 'url("./img/soccer_ball.gif")',
        pausedBallType: 'url("./img/soccer.jpg")',
        xVel: 450,
        yVel: 250,

      },
      {
        background: 'url("img/background/football_field.png")',
        ballType: 'url("./img/football.gif")',
        pausedBallType: 'url("./img/football.jpg")',
        xVel: 450,
        yVel: 250,
      },

    ];

    return ballTypes[i];
  }
}

export default Ball;

import Pong from './pong.js';

class Util {
  constructor() {
    this.compScoreboard = document.getElementById("comp-scoreboard");
    this.humanScoreboard =  document.getElementById("human-scoreboard");
    this.canvas = document.getElementById("pong");
    this.pong = new Pong(this.canvas);
    this.whitespace = document.getElementById("container");

    this.compScoreboard = this.compScoreboard.bind(this);
  }

  mouseMove() {
    whitespace.addEventListener(("mousemove"), (e) => {
      if (e.offsetY -this.pong.human.height >= 0) {
        this.pong.human.pos.y = e.offsetY - this.pong.human.height;
      }
    });
  }

  keyDown() {
    document.addEventListener(("keydown"),(e) => {
        this.pong.paused = !this.pong.paused;
        this.pong.modalView();
    });
  }

  click() {
    document.addEventListener(("click"),(e) => {
      this.pong.paused = !this.pong.paused;
      this.pong.modalView();
    });
  }
}


export default Util;

import Rectangle from './rectangle.js';

class Player extends Rectangle {
  constructor(x,y,name) {
    super(20,100, x, y);
    this.score = 0;
    this.velocity = 1;
    this.name = name;
  }
}

export default Player;

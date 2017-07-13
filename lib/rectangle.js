import Vector from './vector.js';

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

export default Rectangle;

export class Vector {
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


export default Vector;

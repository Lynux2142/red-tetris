import Mat2 from './Matrix.js';

class Tetriminos {
  constructor(tetri, position, center, color) {
    this.tetri = [...tetri];
    this.position = position;
    this.center = center;
    this.color = color;
  }

  rotate() {
    return new Tetriminos(this.tetri.map(value => value.rotate(this.center, 90 * Math.PI / 180)), this.position, this.center, this.color);
  }

  moveRight() {
    return new Tetriminos([...this.tetri], this.position.translateX(1), this.center, this.color);
  }

  moveLeft() {
    return new Tetriminos([...this.tetri], this.position.translateX(-1), this.center, this.color);
  }

  moveDown() {
    return new Tetriminos([...this.tetri], this.position.translateY(1), this.center, this.color);
  }

}

export class Bar extends Tetriminos {
  constructor(position) {
    super([new Mat2(0, 1), new Mat2(1, 1), new Mat2(2, 1), new Mat2(3, 1)], position, new Mat2(1.5, 1.5), 'lightblue');
  }

}
export class Ji extends Tetriminos {
  constructor(position) {
    super([new Mat2(0, 0), new Mat2(0, 1), new Mat2(1, 1), new Mat2(2, 1)], position, new Mat2(1, 1), 'blue');
  }

}
export class El extends Tetriminos {
  constructor(position) {
    super([new Mat2(2, 0), new Mat2(0, 1), new Mat2(1, 1), new Mat2(2, 1)], position, new Mat2(1, 1), 'orange');
  }

}
export class Cube extends Tetriminos {
  constructor(position) {
    super([new Mat2(0, 0), new Mat2(1, 0), new Mat2(0, 1), new Mat2(1, 1)], position, new Mat2(0.5, 0.5), 'yellow');
  }

}
export class Es extends Tetriminos {
  constructor(position) {
    super([new Mat2(1, 0), new Mat2(2, 0), new Mat2(0, 1), new Mat2(1, 1)], position, new Mat2(1, 1), 'green');
  }

}
export class Pyra extends Tetriminos {
  constructor(position) {
    super([new Mat2(1, 0), new Mat2(0, 1), new Mat2(1, 1), new Mat2(2, 1)], position, new Mat2(1, 1), 'purple');
  }

}
export class Zi extends Tetriminos {
  constructor(position) {
    super([new Mat2(0, 0), new Mat2(1, 0), new Mat2(1, 1), new Mat2(2, 1)], position, new Mat2(1, 1), 'red');
  }

}
export default Tetriminos;
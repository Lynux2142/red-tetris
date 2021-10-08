class Tetriminos {
  constructor(points, position, center, color) {
    this.points = [...points];
    this.position = position;
    this.center = center;
    this.color = color;
    this.collided = false;
  }
}

class I extends Tetriminos {
  constructor(position) {
    super([{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}], position, {x: 1.5, y: 1.5}, '80, 227, 230');
  }
}

class J extends Tetriminos {
  constructor(position) {
    super([{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}], position, {x: 1, y: 1}, '36, 95, 223');
  }
}

class L extends Tetriminos {
  constructor(position) {
    super([{x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}], position, {x: 1, y: 1}, '223, 173, 36');
  }
}

class O extends Tetriminos {
  constructor(position) {
    super([{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}], position, {x: 0.5, y: 0.5}, '223, 217, 36');
  }
}

class S extends Tetriminos {
  constructor(position) {
    super([{x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}], position, {x: 1, y: 1}, '48, 211, 56');
  }
}

class T extends Tetriminos {
  constructor(position) {
    super([{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}], position, {x: 1, y: 1}, '132, 61, 198');
  }
}

class Z extends Tetriminos {
  constructor(position) {
    super([{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}], position, {x: 1, y: 1}, '227, 78, 78');
  }
}

module.exports = {I, J, L, O, S, T, Z};

class Tetrisminos {
  constructor(points, position, center, color) {
    this.points = [...points];
    this.position = position;
    this.center = center;
    this.color = color;
  }
}

class I extends Tetrisminos {
  constructor(position) {
    super([{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}], position, {x: 1.5, y: 1.5}, 'lightblue');
  }
}

class J extends Tetrisminos {
  constructor(position) {
    super([{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}], position, {x: 1, y: 1}, 'blue');
  }
}

class L extends Tetrisminos {
  constructor(position) {
    super([{x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}], position, {x: 1, y: 1}, 'orange');
  }
}

class O extends Tetrisminos {
  constructor(position) {
    super([{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}], position, {x: 0.5, y: 0.5}, 'yellow');
  }
}

class S extends Tetrisminos {
  constructor(position) {
    super([{x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}], position, {x: 1, y: 1}, 'green');
  }
}

class T extends Tetrisminos {
  constructor(position) {
    super([{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}], position, {x: 1, y: 1}, 'purple');
  }
}

class Z extends Tetrisminos {
  constructor(position) {
    super([{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}], position, {x: 1, y: 1}, 'red');
  }
}

module.exports = {I, J, L, O, S, T, Z};

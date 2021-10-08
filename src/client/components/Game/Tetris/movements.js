import Mat2 from './Matrix.js';

function rotate(tetriminos) {
  const test = {
    ...tetriminos,
    points: tetriminos.points.map(value => Mat2.rotate(value, tetriminos.center, 90 * Math.PI / 180))
  };
  return (test);
}

function Right(tetriminos) {
  return ({ ...tetriminos, position: Mat2.translateX(tetriminos.position, 1) });
}

function Left(tetriminos) {
  return ({ ...tetriminos, position: Mat2.translateX(tetriminos.position, -1) });
}

function Down(tetriminos) {
  return ({ ...tetriminos, position: Mat2.translateY(tetriminos.position, 1) });
}

export default { rotate, Right, Left, Down };

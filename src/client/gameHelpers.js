export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;
export const WHITE_RGB = '255,255,255';
export const GREY_RGB = '128,128,128';
export const BLACK_RGB = '0,0,0';

export const createGrid = () =>
  Array.from(Array(GRID_HEIGHT), () =>
    new Array(GRID_WIDTH).fill([0, 'white'])
  );

export const testCollision = (newTetri, backGrid) => {
  let result = newTetri.points.find((value) => {
    const realPos = {
      x: newTetri.position.x + value.x,
      y: newTetri.position.y + value.y,
    };
    return (
      realPos.x < 0 ||
      realPos.x >= GRID_WIDTH ||
      realPos.y < 0 ||
      realPos.y >= GRID_HEIGHT ||
      backGrid[realPos.y][realPos.x] !== 'white'
    );
  });
  return !!result;
};

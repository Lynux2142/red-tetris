export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;

export const createGrid = () =>
  Array.from(Array(GRID_HEIGHT), () =>
    new Array(GRID_WIDTH).fill([0, 'clear'])
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

export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;

export const createGrid = () =>
  Array.from(Array(GRID_HEIGHT), () =>
    new Array(GRID_WIDTH).fill([0, 'clear'])
  );

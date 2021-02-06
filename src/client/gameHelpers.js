export const WIDTH = 10;
export const HEIGHT = 20;

export const createGrid = () =>
  Array.from(Array(HEIGHT), () =>
    new Array(WIDTH).fill([0, 'clear']));

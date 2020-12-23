import Tetriminos, { Pyra } from './Tetriminos.js';
import Mat2 from './Matrix.js';

let tetri = new Pyra(new Mat2(0, 0));

console.log(tetri);
tetri = tetri.rotate();
console.log(tetri);
tetri = tetri.moveDown();
console.log(tetri);

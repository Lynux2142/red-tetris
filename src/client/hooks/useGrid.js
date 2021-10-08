import { useState, useEffect } from 'react';
import { createGrid } from '../gameHelpers';

export const useGrid = (tetrimino, resetTetrimino) => {
  const [grid, setGrid] = useState(createGrid());
  const [rowsClearedNb, setRowsClearedNb] = useState(0);

  useEffect(() => {
    setRowsClearedNb(0);

    const removeRows = newGrid =>
      // La méthode reduce() applique une fonction qui est un « accumulateur »
      // et qui traite chaque valeur d'une liste (de la gauche vers la droite)
      // afin de la réduire à une seule valeur.
      newGrid.reduce((accumulator, rowValue) => {
        // La méthode findIndex() renvoie l'indice du premier élément du tableau
        // qui satisfait une condition donnée par une fonction. Si la fonction
        // renvoie faux pour tous les éléments du tableau, le résultat vaut -1.
        if (rowValue.findIndex(cell => cell[0] === 0) === -1) {
          setRowsClearedNb(prev => prev + 1);
          // La méthode unshift() ajoute un ou plusieurs éléments au début d'un
          // tableau et renvoie la nouvelle longueur du tableau.
          accumulator.unshift(new Array(newGrid[0].length).fill([0, 'white']));
          return accumulator;
        }
        accumulator.push(rowValue);
        return accumulator;
      }, []);

    const updateGrid = prevGrid => {
      // First flush the grid
      const newGrid = prevGrid.map(row =>
        row.map(cell => (cell[1] === 'white' ? [0, 'white'] : cell))
      );

      // Then draw the tetromino
      tetrimino.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newGrid[y + tetrimino.pos.y][x + tetrimino.pos.x] = [
              value,
              `${tetrimino.collided ? 'merged' : 'white'}`,
            ];
          }
        });
      });
      // Then check if we collided
      if (tetrimino.collided) {
        resetTetrimino();
        return removeRows(newGrid);
      }

      return newGrid;

    };
    setGrid(prev => updateGrid(prev));
  }, [tetrimino, resetTetrimino]);

  return [grid, setGrid, rowsClearedNb];
};

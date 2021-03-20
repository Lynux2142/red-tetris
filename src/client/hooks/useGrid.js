import { useState, useEffect } from 'react';
import { createGrid } from '../gameHelpers';

export const useGrid = (player, resetPlayer) => {
  const [grid, setGrid] = useState(createGrid());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const removeRows = newGrid =>
      // ack for accumulator
      newGrid.reduce((ack, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);
          ack.unshift(new Array(newGrid[0].length).fill([0, 'clear']));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);
    const updateGrid = prevGrid => {
      // First flush the grid
      const newGrid = prevGrid.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newGrid[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });
      // Then check if we collided
      if (player.collided) {
        resetPlayer();
        return removeRows(newGrid);
      }

      return newGrid;

    };
    setGrid(prev => updateGrid(prev));
  }, [player, resetPlayer]);

  return [grid, setGrid, rowsCleared];
};

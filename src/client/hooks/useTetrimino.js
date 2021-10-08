import {useState, useCallback, useEffect} from 'react';

import {GREY_RGB, GRID_HEIGHT, GRID_WIDTH, testCollision} from '../gameHelpers';
import SocketContext from '../containers/context';
import movement from '../components/Game/Tetris/movements';
const socket = useContext(SocketContext);

export const useTetrimino = () => {
  const [tetriList, setTetriList] = useState([]);
  const [tetrimino, setTetrimino] = useState({});

  useEffect(() => {
    socket.on('newTetris', tetriminos => {
      setTetriList(prev => [...prev, tetriminos]);
    });
  }, []);

  useEffect(() => {
    socket.on('getBlackbar', () => {
      setTetrimino(prev => {
        prev.position.y -= 1;
        return (prev);
      });
    });
  }, []);

  // const rotate = (matrix, dir) => {
  //   // Make the rows to become cols (transpose)
  //   const rotatedTetro = matrix.map((_, index) =>
  //     matrix.map(col => col[index]),
  //   );
  //   // Reverse each row to get a rotated matrix
  //   if (dir > 0) return rotatedTetro.map(row => row.reverse());
  //   return rotatedTetro.reverse();
  // };

  // const tetriminoRotate = (stage, dir) => {
  //   const clonedTetrimino = JSON.parse(JSON.stringify(tetrimino));
  //   clonedTetrimino.tetromino = rotate(clonedTetrimino.tetromino, dir);
  //
  //   const pos = clonedTetrimino.pos.x;
  //   let offset = 1;
  //   while(checkCollision(clonedTetrimino, stage, { x: 0, y: 0})) {
  //     clonedTetrimino.pos.x += offset;
  //     offset = -(offset + (offset > 0 ? 1 : -1));
  //     if (offset > clonedTetrimino.tetromino[0].length) {
  //       rotate(clonedTetrimino.tetromino, -dir);
  //       clonedTetrimino.pos.x = pos;
  //       return;
  //     }
  //   }
  //   setTetrimino(clonedTetrimino);
  //
  // };

  // const updateTetriminoPos = ({ x, y, collided }) => {
  //   setTetrimino(prev => ({
  //     ...prev,
  //     pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
  //     collided,
  //   }));
  // };

  // useCallback here is important to prevent infinity loop
  const resetTetrimino = useCallback(() => {
    setTetrimino({
      pos: { x: GRID_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [tetrimino, setTetrimino, tetriList, setTetriList];
};

import React, { useEffect, useState, useContext } from 'react';
import SocketContext from '../../../containers/context.js';
import useInterval from './useInterval.js';
import movment from './movments.js';
import './Tetris.css';

const Tetris = () => {
  const socket = useContext(SocketContext);
  const WIDTH = 10;
  const HEIGHT = 20;
  const [start, setStart] = useState(false);
  const [tetri, setTetri] = useState({});
  const [backGrid, setBackGrid] = useState(new Array(HEIGHT).fill().map(row => new Array(WIDTH).fill('white')));
  const [frontGrid, setFrontGrid] = useState(new Array(HEIGHT).fill().map(row => new Array(WIDTH).fill(0)));
  const [HTMLgrid, setHTMLgrid] = useState([]);

  const testCollision = (newTetri) => {
    let result = newTetri.points.find(value => {
      const realPos = { x: newTetri.position.x + value.x, y: newTetri.position.y + value.y };
      return (realPos.x < 0 || realPos.x >= WIDTH || realPos.y < 0 || realPos.y >= HEIGHT || backGrid[realPos.y][realPos.x] !== 'white');
    });
    return (result ? true : false);
  };

  const fillTetri = (newTetri) => {
    let newGrid = frontGrid.map(row => row.map(value => 0));
    setTetri(newTetri);
    newTetri.points.map(value => {
      newGrid[newTetri.position.y + value.y][newTetri.position.x + value.x] = 1;
    });
    setFrontGrid([...newGrid]);
  };

  const removeCompletLine = () => {
    let newGrid = [...backGrid];
    backGrid.map((row, i) => {
      if (!row.find(value => value === 'white')) {
        newGrid.splice(i, 1);
        newGrid.splice(0, 0, new Array(WIDTH).fill('white'));
      }
    });
    setBackGrid(newGrid);
  };

  const collision = () => {
    let newGrid = [...backGrid];
    socket.emit('getTetris', newTetri => {
      tetri.points.map(value => {
        newGrid[tetri.position.y + value.y][tetri.position.x + value.x] = tetri.color;
      });
      setBackGrid([...newGrid]);
      if (!testCollision(newTetri)) {
        removeCompletLine();
        fillTetri(newTetri);
      } else {
        alert('Game Over');
        setStart(false);
      }
    });
  };

  const handlerKeydown = (e) => {
    if (e.keyCode === 37) {
      if (!testCollision(movment.Left(tetri))) {
        fillTetri(movment.Left(tetri));
      }
    } else if (e.keyCode === 39) {
      if (!testCollision(movment.Right(tetri))) {
        fillTetri(movment.Right(tetri));
      }
    } else if (e.keyCode === 38) {
      if (!testCollision(movment.rotate(tetri))) {
        fillTetri(movment.rotate(tetri));
      }
    } else if (e.keyCode === 40) {
      if (!testCollision(movment.Down(tetri))) {
        fillTetri(movment.Down(tetri));
      } else {
        collision();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handlerKeydown);
    return (() => document.removeEventListener('keydown', handlerKeydown));
  });

  useEffect(() => {
    let HTMLgrid = [];

    for (let y = 0; y < HEIGHT; ++y) {
      let row = [];
      for (let x = 0; x < WIDTH; ++x) {
        row.push(<td style={{
          backgroundColor: frontGrid[y][x] ? tetri.color : backGrid[y][x]
        }} key={`${y * WIDTH + x}`}></td>);
      }
      HTMLgrid.push(<tr key={`${y}`}>{row}</tr>);
    }
    setHTMLgrid(HTMLgrid);
  }, [frontGrid]);

  useInterval(() => {
    if (start) {
      if (!testCollision(movment.Down(tetri))) {
        fillTetri(movment.Down(tetri));
      } else {
        collision();
      }
    }
  }, 1000);

  const play = () => {
    let newGrid = [...backGrid];
    newGrid = newGrid.map(row => row.map(value => 'white'));
    setBackGrid(newGrid);
    socket.emit('getTetris', tetriminos => {
      setTetri(tetriminos);
    });
    setStart(!start);
  };

  return (
    <div>
      <button className='btn btn-danger m-2' onClick={play}>Play</button>
      <table>
        <tbody>
          {HTMLgrid}
        </tbody>
      </table>
    </div>
  );
};

export default Tetris;

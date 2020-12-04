import React, { useEffect, useState } from 'react';
import useInterval from './useInterval.js';
import './Tetris.css';

const Tetris = () => {
  const WIDTH = 10;
  const HEIGHT = 20;
  const color = ['white', 'black'];
  const [grid, setGrid] = useState(new Array(HEIGHT).fill().map((line) => new Array(WIDTH).fill(0)));
  const [HTMLgrid, setHTMLgrid] = useState([]);
  const [position, setPosition] = useState({x: 4, y: HEIGHT - 1});

  const move = (initial, next) => {
    grid[initial.y][initial.x] = 0;
    grid[next.y][next.x] = 1;
    setGrid([...grid]);
  };

  const handlerKeydown = (e) => {
    if (e.key === 'ArrowLeft' && position.x > 0) {
      move(position, {...position, x: position.x - 1});
      setPosition({...position, x: position.x - 1});
    } else if (e.key === 'ArrowRight' && position.x < WIDTH - 1) {
      move(position, {...position, x: position.x + 1});
      setPosition({...position, x: position.x + 1});
    }
  };

  const handleTimer = () => {
    if (position.y + 1 < HEIGHT) {
      move(position, {...position, y: position.y + 1});
      setPosition({...position, y: position.y + 1});
    } else {
      move(position, {...position, y: 0});
      setPosition({...position, y: 0});
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
        row.push(<td style={{backgroundColor: color[grid[y][x]]}} key={`${y * WIDTH + x}`}></td>);
      }
      HTMLgrid.push(<tr key={`${y}`}>{row}</tr>);
    }
    setHTMLgrid(HTMLgrid);
  }, [grid]);

  useInterval(() => {
    handleTimer();
  }, 1000);

  return (
    <div>
      <table>
        <tbody>
          {HTMLgrid}
        </tbody>
      </table>
    </div>
  );
};

export default Tetris;

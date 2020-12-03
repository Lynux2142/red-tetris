import React, { useEffect, useState } from 'react';
import './Tetris.css';

const Tetris = () => {
  const WIDTH = 10;
  const HEIGHT = 20;
  const color = ['white', 'black'];
  const [grid, setGrid] = useState(new Array(HEIGHT).fill().map((line) => new Array(WIDTH).fill(0)));
  const [tmpY, setTmpY] = useState(0);
  const [tmpX, setTmpX] = useState(4);
  const [HTMLgrid, setHTMLgrid] = useState([]);

  const handlerKeydown = (e) => {
    if (e.key === 'ArrowLeft' && tmpX > 0) {
      setTmpX(tmpX - 1);
    } else if (e.key === 'ArrowRight' && tmpX < WIDTH - 1) {
      setTmpX(tmpX + 1);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handlerKeydown);
    return (() => {
      document.removeEventListener('keydown', handlerKeydown);
    });
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

  useEffect(() => {
    const interval = setInterval(() => {
      grid[tmpY][tmpX] = 0;
      if (tmpY + 1 < HEIGHT) {
        setTmpY(tmpY + 1);
      } else {
        setTmpY(0);
      }
    }, 1000);
    grid[tmpY][tmpX] = 1;
    setGrid([...grid]);
    return (() => {
      clearInterval(interval);
    });
  }, [tmpY, tmpX]);

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

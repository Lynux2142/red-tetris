import React, { useEffect, useState } from 'react';
import useInterval from './useInterval.js';
import { Bar, Ji, El, Cube, Es, Pyra, Zi } from './Tetriminos.js';
import Mat2 from './Matrix.js';
import './Tetris.css';
import { StyledTetrisWrapper, StyledTetris } from '../../styles/StyledTetris';
import Menu from '../../Menu/Menu';

const Tetris = () => {
  const WIDTH = 10;
  const HEIGHT = 20;
  const tetriList = [new Bar(new Mat2(3, -1)), new Ji(new Mat2(3, 0)), new El(new Mat2(3, 0)), new Cube(new Mat2(3, 0)), new Es(new Mat2(3, 0)), new Pyra(new Mat2(3, 0)), new Zi(new Mat2(3, 0))];
  const [tetri, setTetri] = useState(tetriList[Math.round(Math.random() * 6)]);
  const [backGrid, setBackGrid] = useState(new Array(HEIGHT).fill().map(row => new Array(WIDTH).fill('white')));
  const [frontGrid, setFrontGrid] = useState(new Array(HEIGHT).fill().map(row => new Array(WIDTH).fill(0)));
  const [HTMLgrid, setHTMLgrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const startGame = () => {
    // Reset everything
    let newGrid = [...backGrid];
    let newTetri = tetriList[Math.round(Math.random() * 6)];
    newGrid = newGrid.map(row => row.map(value => 'white'));
    setBackGrid(newGrid);
    fillTetri(newTetri, frontGrid, setTetri, setFrontGrid);
    setGameOver(false);
    setScore(0);
  };

  const testCollision = (newTetri) => {
    let result = newTetri.tetri.find(value => {
      const realPos = new Mat2(newTetri.position.x + value.x, newTetri.position.y + value.y);
      return (realPos.x < 0 || realPos.x >= WIDTH || realPos.y < 0 || realPos.y >= HEIGHT || backGrid[realPos.y][realPos.x] !== 'white');
    });
    return (result ? true : false);
  };

  const fillTetri = (newTetri) => {
    let newGrid = frontGrid.map(row => row.map(value => 0));
    setTetri(newTetri);
    newTetri.tetri.map(value => {
      newGrid[newTetri.position.y + value.y][newTetri.position.x + value.x] = 1;
    });
    setFrontGrid([...newGrid]);
  };

  const removeCompletLine = () => {
    let newGrid = [...backGrid];
    setScore(prev => prev + 100);
    backGrid.map((row, i) => {
      if (!row.find(value => value === 'white')) {
        newGrid.splice(i, 1);
        newGrid.splice(0, 0, new Array(WIDTH).fill('white'));
      }
    });
    setBackGrid(newGrid);
  };

  const handlerKeydown = (e) => {
    if (e.keyCode === 37) {
      if (!testCollision(tetri.moveLeft())) {
        fillTetri(tetri.moveLeft());
      }
    } else if (e.keyCode === 39) {
      if (!testCollision(tetri.moveRight())) {
        fillTetri(tetri.moveRight());
      }
    } else if (e.keyCode === 38) {
      if (!testCollision(tetri.rotate())) {
        fillTetri(tetri.rotate());
      }
    } else if (e.keyCode === 40) {
      if (!testCollision(tetri.moveDown())) {
        fillTetri(tetri.moveDown());
      } else {
        let newGrid = [...backGrid];
        let newTetri = tetriList[Math.round(Math.random() * 6)];
        tetri.tetri.map(value => {
          newGrid[tetri.position.y + value.y][tetri.position.x + value.x] = tetri.color;
        });
        setBackGrid([...newGrid]);
        if (!testCollision(newTetri)) {
          removeCompletLine();
          fillTetri(newTetri);
        } else {
          setGameOver(true);
        }
      }
    }
  };

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
    if (!testCollision(tetri.moveDown())) {
      fillTetri(tetri.moveDown());
    } else {
      let newGrid = [...backGrid];
      let newTetri = tetriList[Math.round(Math.random() * 6)];
      tetri.tetri.map(value => {
        newGrid[tetri.position.y + value.y][tetri.position.x + value.x] = tetri.color;
      });
      setBackGrid([...newGrid]);
      if (!testCollision(newTetri)) {
        removeCompletLine();
        fillTetri(newTetri);
      } else {
        setGameOver(true);
      }
    }
  }, 1000);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => handlerKeydown(e)}
    >
      <StyledTetris>
        <table>
          <tbody>
            {HTMLgrid}
          </tbody>
        </table>
        <Menu gameOver={gameOver} startGame={startGame} score={score} />
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;

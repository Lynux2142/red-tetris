import React, { useEffect, useState, useContext } from "react";
import SocketContext from "../../../containers/context.js";
import useInterval from "./useInterval.js";
import movment from "./movments.js";
import "./Tetris.css";
import { StyledTetrisWrapper, StyledTetris } from "../../styles/StyledTetris";
import Menu from "../../Menu/Menu";

const Tetris = () => {
  const socket = useContext(SocketContext);
  const WIDTH = 10;
  const HEIGHT = 20;
  const [start, setStart] = useState(false);
  const [tetriList, setTetriList] = useState([]);
  const [tetri, setTetri] = useState({});
  const [backGrid, setBackGrid] = useState(
    new Array(HEIGHT).fill().map((row) => new Array(WIDTH).fill("white"))
  );
  const [frontGrid, setFrontGrid] = useState(
    new Array(HEIGHT).fill().map((row) => new Array(WIDTH).fill(0))
  );
  const [HTMLgrid, setHTMLgrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const testCollision = (newTetri) => {
    let result = newTetri.points.find((value) => {
      const realPos = {
        x: newTetri.position.x + value.x,
        y: newTetri.position.y + value.y,
      };
      return (
        realPos.x < 0 ||
        realPos.x >= WIDTH ||
        realPos.y < 0 ||
        realPos.y >= HEIGHT ||
        backGrid[realPos.y][realPos.x] !== "white"
      );
    });
    return result ? true : false;
  };

  const fillTetri = (newTetri) => {
    let newGrid = frontGrid.map((row) => row.map((value) => 0));
    setTetri(newTetri);
    newTetri.points.map((value) => {
      newGrid[newTetri.position.y + value.y][newTetri.position.x + value.x] = 1;
    });
    setFrontGrid([...newGrid]);
    };

  const removeCompletLine = () => {
    let newGrid = [...backGrid];
    let score = 0;
    backGrid.map((row, i) => {
      if (!row.find(value => (value === "white" || value === "grey"))) {
        score += 100;
        newGrid.splice(i, 1);
        newGrid.splice(0, 0, new Array(WIDTH).fill("white"));
        socket.emit('sendBlackbar');
      }
    });
    setScore(prev => prev + (score === 400 ? score * 2 : score));
    setBackGrid(newGrid);
  };

  const getSpectrum = () => {
    let spectrum = [];
    for (let x = 0 ; x < WIDTH ; ++x) {
      let tmp = 0;
      for (let y = 0 ; y < HEIGHT ; ++y) {
        if (backGrid[y][x] === 'white') {
          ++tmp;
        }
      }
      spectrum.push(tmp);
    }
    return (spectrum);
  };

  const collision = () => {
    let newGrid = [...backGrid];
    tetri.points.map((value) => {
      newGrid[tetri.position.y + value.y][tetri.position.x + value.x] =
        tetri.color;
    });
    socket.emit('updateSpectrum', getSpectrum());
    setBackGrid([...newGrid]);
    const newTetri = tetriList.shift();
    if (tetriList.length < 3) {
      socket.emit('getTetris', tetriminos => {
        setTetriList(prev => [...prev, tetriminos]);
      });
    }
    if (!testCollision(newTetri)) {
      removeCompletLine();
      fillTetri(newTetri);
    } else {
      setGameOver(true);
      setStart(false);
    }
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
        setScore(prev => prev + 1);
        fillTetri(movment.Down(tetri));
      } else {
        collision();
      }
    }
  };

  useEffect(() => {
    let HTMLgrid = [];

    for (let y = 0; y < HEIGHT; ++y) {
      let row = [];
      for (let x = 0; x < WIDTH; ++x) {
        row.push(
          <td
            style={{
              backgroundColor: frontGrid[y][x] ? tetri.color : backGrid[y][x],
            }}
            key={`${y * WIDTH + x}`}
          ></td>
        );
      }
      HTMLgrid.push(<tr key={`${y}`}>{row}</tr>);
    }
    setHTMLgrid(HTMLgrid);
  }, [frontGrid]);

  useInterval(() => {
    if (!gameOver && start) {
      if (!testCollision(movment.Down(tetri))) {
        fillTetri(movment.Down(tetri));
      } else {
        collision();
      }
    }
  }, 1000);

  useEffect(() => {
    socket.on('getBlackbar', () => {
      setBackGrid(prev => {
        prev.splice(HEIGHT, 0, new Array(WIDTH).fill("grey"));
        prev.splice(0, 1);
        return (prev);
      });
    });
  }, []);

  useEffect(() => {
    socket.on('newTetris', tetriminos => {
      setTetriList(prev => [...prev, tetriminos]);
    });
  }, []);

  useEffect(() => {
    socket.on('getSetTetris', tetriminos => {
      // Reset everything
      const newTetri = tetriminos.shift();
      let newGrid = [...backGrid];
      setStart(true);
      newGrid = newGrid.map((row) => row.map((value) => "white"));
      setBackGrid(newGrid);
      setTetriList([...tetriminos]);
      setTetri(newTetri);
      fillTetri(newTetri);
      setGameOver(false);
      setScore(0);
    });
  }, []);

  const startGame = () => {
    socket.emit('start');
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        window.addEventListener('keydown', (e) => {
          if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
          }
        }, false);
        handlerKeydown(e);
      }}
    >
      <StyledTetris>
        <table>
          <tbody>{HTMLgrid}</tbody>
        </table>
        <Menu gameOver={gameOver} startGame={startGame} score={score} />
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;

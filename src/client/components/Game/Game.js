import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import Tetris from './Tetris/Tetris';
import SocketContext from '../../containers/context';
import useInterval from './Tetris/useInterval';
import movment from './Tetris/movments';
import Menu from '../Menu/Menu';
import PlayersData from '../PlayersData/PlayersData';
import {StyledGame} from '../styles/StyledGame';
import {StyledCell, StyledRow} from '../styles/StyledCell';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { createGrid, HEIGHT, WIDTH } from '../../gameHelpers';

const Game = () => {
  const {windowHeight, windowWidth} = useWindowDimensions();
  const [start, setStart] = useState(false);
  const [tetriList, setTetriList] = useState([]);
  const [tetri, setTetri] = useState({});
  const [tetriShadow, setTetriShadow] = useState({});
  const [backGrid, setBackGrid] = useState(
    new Array(HEIGHT).fill().map((row) => new Array(WIDTH).fill('white'))
  );
  const [frontGrid, setFrontGrid] = useState(
    new Array(HEIGHT).fill().map((row) => new Array(WIDTH).fill(0))
  );
  const [HTMLgrid, setHTMLgrid] = useState([]);
  const [grid, setGrid] = useState(createGrid());

  const socket = useContext(SocketContext);
  const [players, setPlayers] = useState({});
  const [room, setRoom] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const history = useHistory();
  const regex = /#([a-zA-Z]+)\[([a-zA-Z]+)\]/;

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
        backGrid[realPos.y][realPos.x] !== 'white'
      );
    });
    return result ? true : false;
  };

  const fillTetriShadow = (tetri) => {
    while (!testCollision(tetri)) {
      tetri = movment.Down(tetri);
    }
    tetri = {...tetri, position: {...tetri.position, y: tetri.position.y - 1}};
    setTetriShadow(tetri);
    return (tetri);
  };

  const fillTetri = (newTetri) => {
    const tetriShadow = fillTetriShadow(newTetri);
    let newGrid = frontGrid.map(row => row.map((value) => 0));
    setTetri(newTetri);
    tetriShadow.points.map(value => {
      newGrid[tetriShadow.position.y + value.y][tetriShadow.position.x + value.x] = 2;
    });
    newTetri.points.map(value => {
      newGrid[newTetri.position.y + value.y][newTetri.position.x + value.x] = 1;
    });
    setFrontGrid([...newGrid]);
  };

  const removeCompletLine = () => {
    let newGrid = [...backGrid];
    let score = 0;
    backGrid.map((row, i) => {
      if (!row.find(value => (value === 'white' || value === 'grey'))) {
        score += 100;
        newGrid.splice(i, 1);
        newGrid.splice(0, 0, new Array(WIDTH).fill('white'));
        socket.emit('sendBlackbar');
      }
    });
    setScore(prev => prev + (score === 400 ? score * 2 : score));
    setBackGrid(newGrid);
    return ([...newGrid]);
  };

  const getSpectrum = (newGrid) => {
    let spectrum = [];
    for (let x = 0; x < WIDTH; ++x) {
      let tmp = 0;
      for (let y = 0; y < HEIGHT; ++y) {
        if (newGrid[y][x] === 'white') {
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
    setBackGrid([...newGrid]);
    const newTetri = tetriList.shift();
    if (tetriList.length < 3) {
      socket.emit('getTetris', tetriminos => {
        setTetriList(prev => [...prev, tetriminos]);
      });
    }
    if (!testCollision(newTetri)) {
      newGrid = removeCompletLine();
      fillTetri(newTetri);
    } else {
      setGameOver(true);
      setStart(false);
    }
    socket.emit('updateSpectrum', getSpectrum(newGrid));
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
    } else if (e.keyCode === 32) {
      fillTetri(tetriShadow);
      setScore(prev => prev + (tetriShadow.position.y - tetri.position.y));
    }
  };

  useEffect(() => {
    let prevGrid = grid;
    for (let y = 0; y < HEIGHT; ++y) {
      let row = [];
      for (let x = 0; x < WIDTH; ++x) {
        row.push([`${y * WIDTH + x}`, frontGrid[y][x] ? tetri.color : backGrid[y][x]]);
      }
      tmpGrid.push(<StyledRow key={`${y}`}>{row}</StyledRow>);
    }
    setGrid(tmpGrid);
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
        prev.splice(HEIGHT, 0, new Array(WIDTH).fill('grey'));
        prev.splice(0, 1);
        return (prev);
      });
      setTetri(prev => {
        prev.position.y -= 1;
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
      newGrid = newGrid.map((row) => row.map((value) => 'white'));
      setBackGrid(newGrid);
      setTetriList([...tetriminos]);
      setTetri(newTetri);
      fillTetri(newTetri);
      setGameOver(false);
      setScore(0);
    });
  }, []);

  useEffect(() => {
    const urlParams = regex.exec(location.hash);

    if (!urlParams) {
      history.push('/Home');
    } else {
      socket.emit('joinRoom', urlParams[1], urlParams[2], (error, room) => {
        if (error) {
          history.push('/Rooms');
          alert(error);
        } else {
          setRoom(room);
          setPlayers(room.players);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    socket.on('updatePlayers', (players) => {
      setPlayers(players);
    });
  }, [players, socket]);

  const startGame = (e) => {
    document.getElementById('gameSection').focus();
    socket.emit('start');
  };

  return (
    <div className='container'>
      <h1>{room.name}</h1>
      <StyledGame id="gameSection"
                  windowWidth={windowWidth}
                  windowHeight={windowHeight}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => {
                    window.addEventListener('keydown', (e) => {
                      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                        e.preventDefault();
                      }
                    }, false);
                    handlerKeydown(e);
                  }}>
        <Menu gameOver={gameOver} startGame={startGame} score={score}
              gameStarted={start}/>
        <Tetris
          grid={HTMLgrid}/>
        <PlayersData players={players}/>
      </StyledGame>
    </div>
  );
};

export default Game;

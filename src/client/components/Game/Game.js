import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import Tetris from './Tetris/Tetris';
import SocketContext from '../../containers/context';
import useInterval from '../../hooks/useInterval';
import movement from './Tetris/movements';
import Menu from '../Menu/Menu';
import PlayersData from '../PlayersData/PlayersData';
import {StyledGame} from '../styles/StyledGame';
import {StyledCell, StyledRow} from '../styles/StyledCell';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import {
  BLACK_RGB,
  createGrid, GREY_RGB,
  GRID_HEIGHT,
  GRID_WIDTH,
  testCollision, WHITE_RGB
} from '../../gameHelpers';
import {useGrid} from '../../hooks/useGrid';
import {useTetrimino} from '../../hooks/useTetrimino';

const Game = () => {
  const {windowHeight, windowWidth} = useWindowDimensions();
  const [start, setStart] = useState(false);
  const [tetriShadow, setTetriShadow] = useState({});
  const [backGrid, setBackGrid] = useState(
    new Array(GRID_HEIGHT).fill().map((row) => new Array(GRID_WIDTH).fill('white'))
  );
  const [frontGrid, setFrontGrid] = useState(
    new Array(GRID_HEIGHT).fill().map((row) => new Array(GRID_WIDTH).fill(0))
  );
  const [HTMLgrid, setHTMLgrid] = useState([]);
  const [tetrimino, setTetrimino, tetriList, setTetriList] = useTetrimino();
  const [grid, setGrid, rowsClearedNb] = useGrid(tetrimino, resetTetrimino);

  const socket = useContext(SocketContext);
  const [players, setPlayers] = useState({});
  const [room, setRoom] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const history = useHistory();
  const regex = /#([a-zA-Z]+)\[([a-zA-Z]+)\]/;

  console.log('re-render');

  const fillTetriShadow = (tetri) => {
    while (!testCollision(tetri, backGrid)) {
      tetri = movement.Down(tetri);
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

  // const removeCompletLine = () => {
  //   let newGrid = [...backGrid];
  //   let score = 0;
  //   backGrid.map((row, i) => {
  //     if (!row.find(value => (value === WHITE_RGB || value === GREY_RGB))) {
  //       score += 100;
  //       newGrid.splice(i, 1);
  //       newGrid.splice(0, 0, new Array(GRID_WIDTH).fill(WHITE_RGB));
  //       socket.emit('sendBlackbar');
  //     }
  //   });
  //   setScore(prev => prev + (score === 400 ? score * 2 : score));
  //   setBackGrid(newGrid);
  //   return ([...newGrid]);
  // };

  const getSpectrum = (newGrid) => {
    let spectrum = [];
    for (let x = 0; x < GRID_WIDTH; ++x) {
      let tmp = 0;
      for (let y = 0; y < GRID_HEIGHT; ++y) {
        if (newGrid[y][x] === WHITE_RGB) {
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
    if (!testCollision(newTetri, backGrid)) {
      newGrid = removeCompletLine();
      fillTetri(newTetri);
    } else {
      setGameOver(true);
      socket.emit('playerLose');
      setStart(false);
    }
    socket.emit('updateSpectrum', getSpectrum(newGrid));
  };

  const handleKeydown = (e) => {
    if (e.keyCode === 37) {
      if (!testCollision(movement.Left(tetri), backGrid)) {
        fillTetri(movement.Left(tetri));
      }
    } else if (e.keyCode === 39) {
      if (!testCollision(movement.Right(tetri), backGrid)) {
        fillTetri(movement.Right(tetri));
      }
    } else if (e.keyCode === 38) {
      if (!testCollision(movement.rotate(tetri), backGrid)) {
        fillTetri(movement.rotate(tetri));
      }
    } else if (e.keyCode === 40) {
      if (!testCollision(movement.Down(tetri), backGrid)) {
        setScore(prev => prev + 1);
        fillTetri(movement.Down(tetri));
      } else {
        collision();
      }
    } else if (e.keyCode === 32) {
      fillTetri(tetriShadow);
      setScore(prev => prev + (tetriShadow.position.y - tetri.position.y));
    }
  };

  useEffect(() => {
    let HTMLgrid = [];

    for (let y = 0; y < GRID_HEIGHT; ++y) {
      let row = [];
      for (let x = 0; x < GRID_WIDTH; ++x) {
        row.push(
          <td className='cell'
            style={{
              backgroundColor: (frontGrid[y][x] === 1) ? tetri.color : backGrid[y][x],
              borderWidth: (frontGrid[y][x] === 2) ? '2px' : '1px',
              borderColor: (frontGrid[y][x] === 2) ? tetri.color : 'black'
            }}
            key={`${y * GRID_WIDTH + x}`}
          />
        );
      }
      HTMLgrid.push(<tr key={`${y}`}>{row}</tr>);
    }
    setHTMLgrid(HTMLgrid);
  }, [frontGrid]);

  // useEffect(() => {
  //   let HTMLgrid = [];
  //
  //   for (let y = 0; y < GRID_HEIGHT; ++y) {
  //     let row = [];
  //     for (let x = 0; x < GRID_WIDTH; ++x) {
  //       row.push(
  //         <td className='cell'
  //           style={{
  //             backgroundColor: (frontGrid[y][x] === 1) ? tetri.color : backGrid[y][x],
  //             borderWidth: (frontGrid[y][x] === 2) ? '2px' : '1px',
  //             borderColor: (frontGrid[y][x] === 2) ? tetri.color : 'black'
  //           }}
  //           key={`${y * GRID_WIDTH + x}`}
  //         />
  //       );
  //     }
  //     HTMLgrid.push(<tr key={`${y}`}>{row}</tr>);
  //   }
  //   setHTMLgrid(HTMLgrid);
  // }, [frontGrid]);

  // useEffect(() => {
  //   let prevGrid = grid;
  //   for (let y = 0; y < GRID_HEIGHT; ++y) {
  //     let row = [];
  //     for (let x = 0; x < GRID_WIDTH; ++x) {
  //       row.push([`${y * GRID_WIDTH + x}`, frontGrid[y][x] ? tetri.color : backGrid[y][x]]);
  //     }
  //     prevGrid.push(<StyledRow key={`${y}`}>{row}</StyledRow>);
  //   }
  //   setGrid(prevGrid);
  // }, [frontGrid]);

  useInterval(() => {
    if (!gameOver && start) {
      if (!testCollision(movement.Down(tetri), backGrid)) {
        fillTetri(movement.Down(tetri));
      } else {
        collision();
      }
    }
  }, 1000);

  // useEffect(() => {
  //   socket.on('getBlackbar', () => {
  //     setBackGrid(prev => {
  //       prev.splice(GRID_HEIGHT, 0, new Array(GRID_WIDTH).fill(GREY_RGB));
  //       prev.splice(0, 1);
  //       return (prev);
  //     });
  //     setTetri(prev => {
  //       prev.position.y -= 1;
  //       return (prev);
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.on('newTetris', tetriminos => {
  //     setTetriList(prev => [...prev, tetriminos]);
  //   });
  // }, []);

  const initGame = (tetriminos, set) => {
    // Reset everything
    const newTetri = tetriminos;
    let newGrid = [...backGrid];
    newGrid = newGrid.map((row) => row.map((value) => WHITE_RGB));
    setBackGrid(newGrid);
    setTetriList([...set]);
    setTetri(newTetri);
    setGameOver(false);
    setScore(0);
    setStart(true);
  };

  useEffect(() => {
    socket.on('getSetTetris', (tetriminos, set) => {
      initGame(tetriminos, set);
    });
  }, []);

  const startGame = () => {
    document.getElementById('gameSection').focus();
    socket.emit('start', (tetriminos, set) => {
      initGame(tetriminos, set);
    });
  };

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
          if (room.gameInProgress) {
            history.push('/Rooms');
            alert('Game in Progress');
          } else {
            setRoom(room);
            setPlayers(room.players);
          }
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    socket.on('updatePlayers', (players) => {
      setPlayers(players);
    });
  }, [players, socket]);

  useEffect(() => {
    return (() => {
      socket.emit('leaveRoom');
    });
  }, []);

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
                    handleKeydown(e);
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

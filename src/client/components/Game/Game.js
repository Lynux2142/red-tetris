import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SocketContext from '../../containers/context.js';
import Tetris from './Tetris/Tetris.js';
import useSound from 'use-sound';
import TetrisSound from '../../audio/tetris.mp3';

const Game = () => {
  const socket = useContext(SocketContext);
  const [players, setPlayers] = useState({});
  const [room, setRoom] = useState({});
  const history = useHistory();
  const regex = /#([a-zA-Z]+)\[([a-zA-Z]+)\]/;
  const [volume, setVolume] = useState(0.1);
  const [play, { stop }] = useSound(TetrisSound, { volume });

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const urlParams = regex.exec(location.hash);

    if (!urlParams) {
      history.push('/Home');
    } else {
      socket.emit('getMyRoom', (error, room) => {
        if (error) {
          history.push('/Home');
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

  useEffect(() => {
    play();
    return(() => {
      stop();
    });
  }, [play]);

  const leave = () => {
    socket.emit('leaveRoom');
    history.push('/Room');
  };

  const muteMusic = () => {
    setVolume((volume === 0) ? 0.1 : 0);
  };

  const decrease = () => {
    setVolume(volume - 0.01);
  };

  const increase = () => {
    setVolume(volume + 0.01);
  };

  return (
    <div className='container'>
      <h1>{room.name}</h1>
      {
        Object.keys(players).map((key, i) => <p key={i}>{players[key].name}</p>)
      }
      <button className='btn btn-danger' onClick={decrease}>-</button>
      <button className='btn btn-danger' onClick={muteMusic}>Mute</button>
      <button className='btn btn-danger' onClick={increase}>+</button>
      <Tetris />
      <button className='btn btn-danger' onClick={leave}>Leave</button>
    </div>
  );
};

export default Game;

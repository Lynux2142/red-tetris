import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SocketContext from '../../containers/context.js';
import Tetris from './Tetris/Tetris.js';

const Game = () => {
  const socket = useContext(SocketContext);
  const [players, setPlayers] = useState({});
  const [room, setRoom] = useState({});
  const history = useHistory();
  const regex = /#([a-zA-Z]+)\[([a-zA-Z]+)\]/;

  useEffect(() => {
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

  return (
    <div className='container'>
      <h1>{room.name}</h1>
      {
        Object.keys(players).map((key, i) => <p key={i}>{players[key].name}</p>)
      }
      <Tetris />
    </div>
  );
};

export default Game;

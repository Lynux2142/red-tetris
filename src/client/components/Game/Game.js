import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SocketContext from '../../containers/context';
import Tetris from './Tetris/Tetris';

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
  }, [players]);

  const leave = () => {
    socket.emit('leaveRoom');
    history.push('/Room');
  };

  return (
    <div className='container'>
      <h1>{room.name}</h1>
      {
        Object.keys(players).map((key, i) => <p key={i}>{players[key].name}</p>)
      }
      <Tetris />
      <button className='btn btn-danger' onClick={leave}>Leave</button>
    </div>
  );
};

export default Game;

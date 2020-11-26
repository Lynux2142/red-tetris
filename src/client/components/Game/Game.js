import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import params from '../../../../params.js';
import './Game.css';

let socket;

const Game = () => {
  const [players, setPlayers] = useState({});
  const [room, setRoom] = useState({});
  const history = useHistory();
  const regex = /#([a-zA-Z]+)\[([a-zA-Z]+)\]/;

  useEffect(() => {
    const urlParams = regex.exec(location.hash);

    if (!urlParams) {
      history.push('/Home');
    } else {
      socket = io(params.server.url);
      socket.emit('join', (urlParams[2]));
      socket.emit('getRooms');
      socket.on('getRooms', (rooms) => {
        if (urlParams[1] in rooms) {
          socket.emit('joinRoom', urlParams[1]);
        } else {
          socket.emit('addRoom', urlParams[1]);
        }
      });
      socket.on('getMyRoom', (room) => {
        setRoom(room);
        console.log(room);
        setPlayers(room.players);
      });
    }
    return (() => {
      if (socket) {
        socket.emit('disconnect');
        socket.close();
      }
    });
  }, [params.server.url]);

  return (
    <div>
      <h1>bonjour je suis Game</h1>
      <h3>{room.name}</h3>
      {
        Object.keys(players).map((key, i) => <p key={i}>{players[key].name}</p>)
      }
    </div>
  );
};

export default Game;

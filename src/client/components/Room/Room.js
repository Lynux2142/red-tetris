import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import params from '../../../../params.js';

let socket;

const Room = () => {
  const history = useHistory();
  const [rooms, setRooms] = useState({});

  const create_room = () => {
    history.push('/New-room');
  };

  const joinRoom = (roomName) => {
    history.push(`/Join-room#${roomName}`);
  };

  useEffect(() => {
    socket = io(params.server.url);
    socket.emit('getRooms');
    return (() => {
      socket.emit('disconnect');
      socket.close();
    });
  }, [params.server.url]);

  useEffect(() => {
    socket.on('getRooms', (rooms) => {
      setRooms(rooms);
    });
  });

  return (
    <div>
      <h1>Bonjour je suis Room</h1>
      <h3>Room list</h3>
      {
        Object.keys(rooms).map((key, i) => {
          return ([
            <p key={i}>{rooms[key].name}</p>,
            <button key={'room' + {i}} onClick={() => joinRoom(rooms[key].name)}>Join</button>
          ]);
        })
      }
      <button onClick={create_room}>Create Room</button>
    </div>
  );
};

export default Room;

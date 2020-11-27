import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SocketContext from '../../containers/context';

const Room = () => {
  const socket = useContext(SocketContext);
  const history = useHistory();
  const [rooms, setRooms] = useState({});

  const create_room = () => {
    history.push('/New-room');
  };

  const joinRoom = (roomName) => {
    history.push(`/Join-room#${roomName}`);
  };

  useEffect(() => {
    socket.emit('getRooms', (rooms) => {
      setRooms(rooms);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('updateRooms', (rooms) => {
      setRooms(rooms);
    });
  }, [rooms]);

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

import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SocketContext from '../../containers/context.js';
import './Room.css';

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
    <div className='container'>
      <h1>Room list</h1>
      <div className='list-group mb-3'>
      {
        Object.keys(rooms).map((key, i) => {
          return (
            <li className='list-group-item p-1' key={i}>
              <label><b>{rooms[key].name}</b></label>
              <button className='btn btn-danger float-right' onClick={() => joinRoom(rooms[key].name)}>Join</button>
            </li>
          );
        })
      }
      </div>
      <button className='btn btn-danger' onClick={create_room}>Create New Room</button>
    </div>
  );
};

export default Room;

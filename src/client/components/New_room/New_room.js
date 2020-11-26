import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import params from '../../../../params.js';

let socket;

const New_room = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRoomChange = (e) => {
    setRoom(e.target.value);
  };

  const create = () => {
    if (name && room) {
      history.push(`/#${room}[${name}]`);
    }
  };

  useEffect(() => {
    socket = io(params.server.url);
    return (() => {
      socket.emit('disconnect');
      socket.close();
    });
  }, [params.server.url]);

  return (
    <div>
      <form>
        <input type='text' placeholder='Username' onChange={handleNameChange} />
        <input type='text' placeholder='Room name' onChange={handleRoomChange}/>
        <button onClick={create}>Create</button>
      </form>
    </div>
  );
};

export default New_room;

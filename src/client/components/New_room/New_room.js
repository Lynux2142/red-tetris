import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SocketContext from '../../containers/context';

const New_room = () => {
  const socket = useContext(SocketContext);
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
      socket.emit('join', name);
      socket.emit('addRoom', room);
      history.push(`/#${room}[${name}]`);
    }
  };

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

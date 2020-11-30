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

  const create = (e) => {
    e.preventDefault();
    if (name && room) {
      socket.emit('join', name);
      socket.emit('addRoom', room, (error) => {
        console.log(error);
        if (!error) {
          history.push(`/#${room}[${name}]`);
        } else {
          alert('Room name already exist');
        }
      });
    }
  };

  return (
    <div>
      <form>
        <input type='text' placeholder='Username' onChange={handleNameChange} />
        <input type='text' placeholder='Room name' onChange={handleRoomChange}/>
        <input type='submit' value='Create' onClick={create} />
      </form>
    </div>
  );
};

export default New_room;

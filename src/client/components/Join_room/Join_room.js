import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SocketContext from '../../containers/context';

const JoinRoom = () => {
  const socket = useContext(SocketContext);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const history = useHistory();
  const regex = /#([a-zA-Z]+)/;

  useEffect(() => {
    setRoom(regex.exec(location.hash)[1]);
  }, [location.hash]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const join = () => {
    if (name) {
      socket.emit('join', name);
      socket.emit('joinRoom', room);
      history.push(`/#${room}[${name}]`);
    }
  };

  return (
    <div>
      <h1>bonjours je suis JoinRoom</h1>
      <h3>Join {room}</h3>
      <form>
        <input placeholder='Username' onChange={handleChange} />
        <button onClick={join} >Join</button>
      </form>
    </div>
  );
};

export default JoinRoom;

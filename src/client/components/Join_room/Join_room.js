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

  const join = (e) => {
    e.preventDefault();
    if (name) {
      socket.emit('join', name);
      socket.emit('joinRoom', room, (error) => {
        if (!error) {
          history.push(`/#${room}[${name}]`);
        } else {
          alert('Username already taken');
        }
      });
    }
  };

  return (
    <div className='container'>
      <h1>Join "{room}"</h1>
      <form>
        <div className='form-group'>
          <input className='form-control' placeholder='Username' onChange={handleChange} />
        </div>
        <input className='btn btn-danger' type='submit' value='Join' onClick={join} />
      </form>
    </div>
  );
};

export default JoinRoom;

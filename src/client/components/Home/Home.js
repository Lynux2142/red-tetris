import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import params from '../../../../params.js';

let socket;

const Home = () => {
  const history = useHistory();
  const [users, setUsers] = useState({});
  const [uname, setUname] = useState('');
  const [room, setRoom] = useState('');
  const regex = /#([a-zA-Z]+)\[([a-zA-Z]+)\]/;

  useEffect(() => {
    const result = regex.exec(location.hash);

    if (result) {
      socket = io(params.server.url);
      setUname(result[2]);
      setRoom(result[1]);
      socket.emit('join', result ? result[2] : null);
      socket.on('newUser', (users) => {
        setUsers(users);
      });
    } else {
      history.push('/Login');
    }
  }, [params.server.url]);

  return (
    <div className="Home">
      <h1>Bonjour</h1>
      {
        Object.keys(users).map((key, i) => <p key={i}>{users[key]}</p>)
      }
    </div>
  );
};

export default Home;

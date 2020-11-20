import React from 'react';
import { useHistory } from 'react-router-dom';

const Room = () => {
  const history = useHistory();

  const login = () => {
    history.push('/Login');
  };

  return (
    <div>
      <h1>Bonjour je suis Room</h1>
      <button onClick={login}>Log In</button>
    </div>
  );
};

export default Room;

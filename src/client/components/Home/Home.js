import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  const play = () => {
    history.push('/Rooms');
  };

  return (
    <div className='container'>
      <h1>Bienvenue sur Red Tetris</h1>
      <button className='btn btn-danger' onClick={play}>Play</button>
    </div>
  );
};

export default Home;

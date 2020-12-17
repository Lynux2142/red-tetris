import React from 'react';
import { useHistory } from 'react-router-dom';
import Tetris from '../Game/Tetris/Tetris.js';

const Home = () => {
  const history = useHistory();

  const play = () => {
    history.push('/Room');
  };

  return (
    <div className='container'>
      <h1>Bienvenue sur Red Tetris</h1>
      <button className='btn btn-danger' onClick={play}>Play</button>
    </div>
  );
};

export default Home;

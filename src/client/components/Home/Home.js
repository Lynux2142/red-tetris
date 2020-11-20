import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  const play = () => {
    history.push('/Room');
  };

  return (
    <div className="Home">
      <h1>Bienvenue sur Red Tetris</h1>
      <button onClick={play}>Play</button>
    </div>
  );
};

export default Home;
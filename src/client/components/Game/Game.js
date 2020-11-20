import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Game = () => {
  const history = useHistory();
  const regex = /#([a-zA-z]+\[([a-zA-z]+)\])/;

  useEffect(() => {
    const urlParams = regex.exec(location.hash);

    if (!urlParams) {
      history.push('/Home');
    }
  });

  return (
    <div>
      <h1>bonjour je suis Game</h1>
    </div>
  );
};

export default Game;

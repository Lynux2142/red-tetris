import React from 'react';
import { useHistory } from 'react-router-dom';
import Tetris from '../Game/Tetris/Tetris.js';

const Home = () => {
  const history = useHistory();

  const play = () => {
    history.push('/Room');
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("h1", null, "Bienvenue sur Red Tetris"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    onClick: play
  }, "Play"));
};

export default Home;
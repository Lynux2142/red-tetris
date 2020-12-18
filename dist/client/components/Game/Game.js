import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SocketContext from '../../containers/context.js';
import Tetris from './Tetris/Tetris.js';
import useSound from 'use-sound';
import TetrisSound from '../../audio/tetris.mp3';

const Game = () => {
  const socket = useContext(SocketContext);
  const [players, setPlayers] = useState({});
  const [room, setRoom] = useState({});
  const history = useHistory();
  const regex = /#([a-zA-Z]+)\[([a-zA-Z]+)\]/;
  const [volume, setVolume] = useState(0.1);
  const [play, {
    stop
  }] = useSound(TetrisSound, {
    volume
  });
  useEffect(() => {
    const urlParams = regex.exec(location.hash);

    if (!urlParams) {
      history.push('/Home');
    } else {
      socket.emit('getMyRoom', (error, room) => {
        if (error) {
          history.push('/Home');
        } else {
          setRoom(room);
          setPlayers(room.players);
        }
      });
    }
  }, [socket]);
  useEffect(() => {
    socket.on('updatePlayers', players => {
      setPlayers(players);
    });
  }, [players]);
  useEffect(() => {
    play();
    return () => {
      stop();
    };
  }, [play]);

  const leave = () => {
    socket.emit('leaveRoom');
    history.push('/Room');
  };

  const muteMusic = () => {
    setVolume(volume === 0 ? 0.1 : 0);
  };

  const decrease = () => {
    setVolume(volume - 0.01);
  };

  const increase = () => {
    setVolume(volume + 0.01);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("h1", null, room.name), Object.keys(players).map((key, i) => /*#__PURE__*/React.createElement("p", {
    key: i
  }, players[key].name)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    onClick: decrease
  }, "-"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    onClick: muteMusic
  }, "Mute"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    onClick: increase
  }, "+"), /*#__PURE__*/React.createElement(Tetris, null), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    onClick: leave
  }, "Leave"));
};

export default Game;
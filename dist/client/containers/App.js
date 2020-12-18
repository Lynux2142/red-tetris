import React, { useEffect } from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import socket from './socket.js';
import SocketContext from './context.js';
import Game from '../components/Game/Game.js';
import Home from '../components/Home/Home.js';
import Room from '../components/Room/Room.js';
import New_room from '../components/New_room/New_room.js';
import JoinRoom from '../components/Join_room/Join_room.js';
import './App.css';

const App = () => {
  return /*#__PURE__*/React.createElement(SocketContext.Provider, {
    value: socket
  }, /*#__PURE__*/React.createElement(Routes, null, /*#__PURE__*/React.createElement(Route, {
    path: "/",
    exact: true,
    component: Game
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/Home",
    component: Home
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/Room",
    component: Room
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/New-room",
    component: New_room
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/Join-room",
    component: JoinRoom
  })));
};

export default App;
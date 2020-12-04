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
  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path='/' exact component={Game} />
        <Route path='/Home' component={Home} />
        <Route path='/Room' component={Room} />
        <Route path='/New-room' component={New_room} />
        <Route path='/Join-room' component={JoinRoom} />
      </Routes>
    </SocketContext.Provider>
  );
};

export default App;

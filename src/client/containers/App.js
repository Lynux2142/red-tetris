import React from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import socket from './socket.js';
import SocketContext from './context.js';
import Game from '../components/Game/Game.js';
import Home from '../components/Home/Home.js';
import Rooms from '../components/Rooms/Rooms.js';
import New_room from '../components/New_room/New_room.js';
import './App.css';

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path='/' exact component={Game} />
        <Route path='/Home' component={Home} />
        <Route path='/Rooms' component={Rooms} />
        <Route path='/New-room' component={New_room} />
      </Routes>
    </SocketContext.Provider>
  );
};

export default App;

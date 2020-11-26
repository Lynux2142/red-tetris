import React, { useEffect } from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Game from '../components/Game/Game';
import Home from '../components/Home/Home';
import Room from '../components/Room/Room';
import New_room from '../components/New_room/New_room';
import JoinRoom from '../components/Join_room/Join_room';
import params from '../../../params.js';

const App = () => {
  return (
    <Routes>
      <Route path='/' exact component={Game} />
      <Route path='/Home' component={Home} />
      <Route path='/Room' component={Room} />
      <Route path='/New-room' component={New_room} />
      <Route path='/Join-room' component={JoinRoom} />
    </Routes>
  );
};

export default App;

import React, { useEffect } from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Game from '../components/Game/Game';
import Home from '../components/Home/Home';
import Room from '../components/Room/Room';
import Login from '../components/Login/Login';
import params from '../../../params.js';

const App = () => {
  return (
    <Routes>
      <Route path='/' exact component={Game} />
      <Route path='/Home' component={Home} />
      <Route path='/Room' component={Room} />
      <Route path='/Login' component={Login} />
    </Routes>
  );
};

export default App;

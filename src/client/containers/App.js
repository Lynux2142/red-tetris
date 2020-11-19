import React, { useEffect, useState } from 'react';
import { Switch, BrowserRouter as Routes, Route, Redirect } from 'react-router-dom';
import Home from '../components/Home/Home.js';
import Login from '../components/Login/Login.js';

let socket;

const App = () => {
  return (
    <Routes>
      <Route path='/' exact component={Home} />
      <Route path='/Login' component={Login} />
    </Routes>
  );
};

export default App;

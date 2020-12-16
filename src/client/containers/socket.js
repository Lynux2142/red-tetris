import React from 'react';
import io from 'socket.io-client';
import params from '../../../params.js';

const socket = io('https://red-tetris-malg.herokuapp.com');

export default socket;

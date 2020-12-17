import React from 'react';
import io from 'socket.io-client';
import params from '../../../params.js';

const socket = io(params.server.url);

export default socket;

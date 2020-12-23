import React from 'react';
import socket from './socket.js';

const SocketContext = React.createContext(socket);

export default SocketContext;

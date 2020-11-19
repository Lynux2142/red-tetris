import params  from '../../params.js';
import { createRequire } from 'module';
import debug from 'debug';

const require = createRequire(import.meta.url);

const logerror = debug('tetris:error');
const loginfo = debug('tetris:info');

const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { host, port } = params.server;

let users = {};

io.on('connection', (socket) => {
  loginfo('Socket connected: ' + socket.id);

  socket.on('join', (username) => {
    if (username) {
      users[socket.id] = username;
      socket.emit('newUser', users);
      socket.broadcast.emit('newUser', users);
    }
  });

  socket.on('disconnect', () => {
    loginfo('Socket disconnected ' + socket.id);
    delete users[socket.id];
    socket.broadcast.emit('newUser', users);
  });
});

server.listen(port, host, () => loginfo(`tetris listen on ${params.server.url}`));

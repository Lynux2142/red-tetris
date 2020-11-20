import params  from '../../params.js';
import { createRequire } from 'module';
import debug from 'debug';
import Player from './player.js';
import Room from './room.js';

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

let players = {};
let rooms = {};

io.on('connection', (socket) => {
  loginfo('Socket connected: ' + socket.id);

  socket.on('addRoom', (roomName) => {
    rooms[roomName] = new Room(roomName, players[socket.id]);
    console.log(rooms);
    socket.emit('getRooms', rooms);
    socket.broadcast.emit('getRooms', rooms);
  });

  socket.on('joinRoom', (roomName) => {
    rooms[roomName].addPlayer(players[socket.id]);
  });

  socket.on('leaveRoom', () => {
    rooms[players[socket.id].room].removePlayer(players[socket.id]);
  });

  socket.on('join', (username) => {
    if (username) {
      players[socket.id] = new Player(username, socket.id);
      socket.emit('newUser', players);
      socket.broadcast.emit('newUser', players);
    }
  });

  socket.on('disconnect', () => {
    loginfo('Socket disconnected ' + socket.id);
    if (players[socket.id] && players[socket.id].room) {
      rooms[players[socket.id].room].removePlayer(players[socket.id]);
    }
    delete players[socket.id];
    socket.broadcast.emit('newUser', players);
  });
});

server.listen(port, host, () => loginfo(`tetris listen on ${params.server.url}`));

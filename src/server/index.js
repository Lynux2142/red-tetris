const http = require('http');
const express = require('express');
const path = require('path');
const debug = require('debug');
const Player = require('./player.js');
const Room = require('./room.js');
const Tetriminos = require('./tetriminos.js');
const start = { x: 3, y: 0 };
const tetriList = [new Tetriminos.I(start), new Tetriminos.J(start), new Tetriminos.L(start), new Tetriminos.O(start), new Tetriminos.S(start), new Tetriminos.T(start), new Tetriminos.Z(start)];
const logerror = debug('tetris:ERROR');
const loginfo = debug('tetris:Info');

let players = {};
let rooms = {};
let playertest = new Player('playertest', 1234);
rooms['roomtest'] = new Room('roomtest', playertest);

const leaveRoom = (socket) => {
  const playerRoom = players[socket.id].room;

  rooms[playerRoom].removePlayer(players[socket.id]);
  socket.to(playerRoom).broadcast.emit('updatePlayers', rooms[playerRoom].players);
  if (rooms[playerRoom].size === 0) {
    delete rooms[playerRoom];
    socket.broadcast.emit('updateRooms', (rooms));
    socket.leave(playerRoom);
  }
};

const nameAlreadyExist = (data, value) => {
  return (
    Object.keys(data).find(key => {
      return (data[key].name === value);
    }) ? true : false
  );
};

const initApp = (server, app, params, cb) => {
  const { host, port } = params;
  app.use(express.static(path.join(__dirname, '../../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
  server.listen(process.env.PORT || port, () => {
    loginfo(`tetris listen on ${params.url}`);
    cb();
  });
};

const initEngine = (io) => {
  io.on('connection', (socket) => {
    loginfo('Socket connected: ' + socket.id);

    socket.on('addRoom', (roomName, callback) => {
      const roomExist = nameAlreadyExist(rooms, roomName);

      if (!roomExist) {
        rooms[roomName] = new Room(roomName, players[socket.id]);
        socket.join(roomName);
        socket.broadcast.emit('updateRooms', rooms);
      }
      callback(roomExist);
    });

    socket.on('getMyRoom', (callback) => {
      if (players[socket.id] && rooms[players[socket.id].room]) {
        callback(false, rooms[players[socket.id].room]);
      } else {
        callback(true, null);
      }
    });

    socket.on('getRooms', (callback) => {
      callback(rooms);
    });

    socket.on('joinRoom', (roomName, callback) => {
      const unameExist = nameAlreadyExist(rooms[roomName].players, players[socket.id].name);

      if (!unameExist) {
        rooms[roomName].addPlayer(players[socket.id]);
        socket.join(roomName);
        socket.to(roomName).broadcast.emit('updatePlayers', rooms[roomName].players);
      }
      callback(unameExist);
    });

    socket.on('updateSpectrum', value => {
      const playerRoom = players[socket.id].room;
      rooms[playerRoom].players[socket.id].spectrum = [...value];
      socket.emit('updatePlayers', rooms[playerRoom].players);
      socket.to(playerRoom).broadcast.emit('updatePlayers', rooms[playerRoom].players);
    });

    socket.on('getTetris', callback => {
      const newTetris = tetriList[Math.round(Math.random() * 6)];
      socket.to(players[socket.id].room).broadcast.emit('newTetris', newTetris);
      callback(newTetris);
    });

    socket.on('start', () => {
      let setTetris = [];
      for (let i = 0 ; i < 4 ; ++i) {
        setTetris.push(tetriList[Math.floor(Math.random() * 6)]);
      }
      socket.emit('getSetTetris', [...setTetris]);
      socket.to(players[socket.id].room).broadcast.emit('getSetTetris', [...setTetris]);
    });

    socket.on('leaveRoom', () => {
      leaveRoom(socket);
    });

    socket.on('join', (username) => {
      players[socket.id] = new Player(username, socket.id);
    });

    socket.on('disconnect', () => {
      loginfo('Socket disconnected ' + socket.id);
      if (players[socket.id] && players[socket.id].room) {
        leaveRoom(socket);
      }
      delete players[socket.id];
      socket.broadcast.emit('newUser', players);
    });
  });
};

module.exports = function create(params) {
  const app = express();
  const server = http.createServer(app);
  initApp(server, app, params, () => {
    const io = require('socket.io')(server, { cookie: false });
    initEngine(io);
  });
};

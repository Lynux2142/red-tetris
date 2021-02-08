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
let playertest = new Player('playertest', '1234');
rooms['roomtest'] = new Room('roomtest', playertest);

const leaveRoom = (socket) => {
  if (players[socket.id]) {
    const playerRoom = players[socket.id].room;
    rooms[playerRoom].removePlayer(players[socket.id]);
    delete players[socket.id];
    socket.to(playerRoom).broadcast.emit('updatePlayers', rooms[playerRoom].players);
    socket.leave(playerRoom);
    if (rooms[playerRoom].size === 0) {
      delete rooms[playerRoom];
      socket.broadcast.emit('updateRooms', (rooms));
    }
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

    socket.on('getRooms', (callback) => {
      callback(rooms);
    });

    socket.on('joinRoom', (roomName, username, callback) => {
      const roomExist = nameAlreadyExist(rooms, roomName);
      if (roomExist) {
        const unameExist = nameAlreadyExist(rooms[roomName].players, username);
        if (!unameExist) {
          players[socket.id] = new Player(username, socket.id);
          rooms[roomName].addPlayer(players[socket.id]);
          socket.join(roomName);
          socket.to(roomName).broadcast.emit('updatePlayers', rooms[roomName].players);
          socket.broadcast.emit('updateRooms', rooms);
        } else { callback('Username already taken', null); }
      } else {
        players[socket.id] = new Player(username, socket.id);
        rooms[roomName] = new Room(roomName, players[socket.id]);
        socket.join(roomName);
        socket.broadcast.emit('updateRooms', rooms);
      }
      callback(null, rooms[roomName]);
    });

    socket.on('updateSpectrum', value => {
      const playerRoom = players[socket.id].room;
      rooms[playerRoom].players[socket.id].spectrum = [...value];
      socket.emit('updatePlayers', rooms[playerRoom].players);
      socket.to(playerRoom).broadcast.emit('updatePlayers', rooms[playerRoom].players);
    });

    socket.on('sendBlackbar', () => {
      const playerRoom = players[socket.id].room;
      Object.keys(rooms[playerRoom].players).map(key => {
        if (rooms[playerRoom].players[key].id === socket.id) {
          rooms[playerRoom].players[key].spectrum.map(value => value - 1);
        }
      });
      socket.to(playerRoom).broadcast.emit('getBlackbar');
      socket.to(playerRoom).broadcast.emit('updatePlayers', rooms[playerRoom].players);
    });

    socket.on('getTetris', callback => {
      const newTetris = tetriList[Math.round(Math.random() * 6)];
      socket.to(players[socket.id].room).broadcast.emit('newTetris', newTetris);
      callback(newTetris);
    });

    socket.on('start', (callback) => {
      const playerRoom = players[socket.id].room;
      let setTetris = [];
      let tetri;
      for (let i = 0 ; i < 4 ; ++i) {
        setTetris.push(tetriList[Math.floor(Math.random() * 6)]);
      }
      tetri = setTetris.shift();
      Object.keys(rooms[playerRoom].players).map(key => {
        return (rooms[playerRoom].players[key].alive = (rooms[playerRoom].players[key].name === 'playertest') ? false : true);
      });
      Object.keys(rooms[playerRoom].players).map(key => rooms[playerRoom].players[key].spectrum = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]);
      socket.emit('updatePlayers', rooms[playerRoom].players);
      socket.to(rooms[playerRoom]).broadcast.emit('updatePlayers', rooms[playerRoom].players);
      socket.to(playerRoom).broadcast.emit('getSetTetris', tetri, [...setTetris]);
      rooms[playerRoom].startGame();
      socket.emit('updateRooms', rooms);
      socket.broadcast.emit('updateRooms', rooms);
      callback(tetri, [...setTetris]);
    });

    socket.on('playerLose', () => {
      const playerRoom = players[socket.id].room;
      rooms[playerRoom].players[socket.id].alive = false;
      if (!Object.keys(rooms[playerRoom].players).find(key => {
        return (rooms[playerRoom].players[key].alive === true);
      })) {
        rooms[playerRoom].stopGame();
        socket.emit('updateRooms', rooms);
        socket.broadcast.emit('updateRooms', rooms);
      }
    });

    socket.on('stop', () => {
      rooms[players[socket.id].room].stopGame();
      socket.emit('updateRooms', rooms);
      socket.broadcast.emit('updateRooms', rooms);
    });

    socket.on('leaveRoom', () => {
      leaveRoom(socket);
      socket.emit('updateRooms', rooms);
      socket.broadcast.emit('updateRooms', rooms);
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

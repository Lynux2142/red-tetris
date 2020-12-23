import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import debug from 'debug';
import params  from '../../params.js';
import Player from './player.js';
import Room from './room.js';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const initApp = (app, params, cb) => {
  const { host, port } = params;
  const handler = (req, res) => {
    const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html';
    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        logerror(err);
        res.writeHead(500);
        return (res.end('Error loading index.html'));
      }
      res.writeHead(200, {"Content-Type": (file.search('index') !== -1) ? "text/html" : "text/javascript"});
      res.end(data);
    });
  };
  app.on('request', handler);
  app.listen(process.env.PORT || port, host, () => {
    loginfo(`tetri listen on ${params.url}`);
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

export function create(params) {
  const promise = new Promise((resolve, reject) => {
    const app = require('http').createServer(require('express'));
    initApp(app, params, () => {
      const io = require('socket.io')(app, { cookie: false });
      const stop = (cb) => {
        io.close();
        app.close(() => {
          app.unref();
        });
        loginfo('Engine stopped.');
        cb();
      };
      initEngine(io);
      resolve({ stop });
    });
  });
  return (promise);
}

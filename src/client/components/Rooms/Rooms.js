import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SocketContext from '../../containers/context.js';
import RoomList from './RoomList/RoomList.js';
import JoinRoom from './Join_room/Join_room.js';
import './Rooms.css';

const Rooms = () => {
  const socket = useContext(SocketContext);
  const history = useHistory();
  const [rooms, setRooms] = useState({});
  const [joinName, setJoinName] = useState(null);

  const createRoom = () => {
    history.push('/New-room');
  };

  const joinRoom = (roomName) => {
    setJoinName(roomName);
  };

  const Display = () => {
    if (joinName) {
      return (<JoinRoom roomName={joinName} />);
    } else {
      return (<RoomList rooms={rooms} createRoom={createRoom} joinRoom={joinRoom} />);
    }
  };

  useEffect(() => {
    socket.emit('getRooms', (rooms) => {
      setRooms(rooms);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('updateRooms', (rooms) => {
      setRooms(rooms);
    });
  }, [rooms]);

  return (
    <Display />
  );
};

export default Rooms;

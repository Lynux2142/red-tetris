import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SocketContext from '../../containers/context.js';
import './Room.css';

const Room = () => {
  const socket = useContext(SocketContext);
  const history = useHistory();
  const [rooms, setRooms] = useState({});

  const create_room = () => {
    history.push('/New-room');
  };

  const joinRoom = roomName => {
    history.push(`/Join-room#${roomName}`);
  };

  useEffect(() => {
    socket.emit('getRooms', rooms => {
      setRooms(rooms);
    });
  }, [socket]);
  useEffect(() => {
    socket.on('updateRooms', rooms => {
      setRooms(rooms);
    });
  }, [rooms]);
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("h1", null, "Room list"), /*#__PURE__*/React.createElement("div", {
    className: "list-group mb-3"
  }, Object.keys(rooms).map((key, i) => {
    return /*#__PURE__*/React.createElement("li", {
      className: "list-group-item p-1",
      key: i
    }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("b", null, rooms[key].name)), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-danger float-right",
      onClick: () => joinRoom(rooms[key].name)
    }, "Join"));
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    onClick: create_room
  }, "Create New Room"));
};

export default Room;
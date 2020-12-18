import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SocketContext from '../../containers/context.js';

const New_room = () => {
  const socket = useContext(SocketContext);
  const history = useHistory();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleRoomChange = e => {
    setRoom(e.target.value);
  };

  const create = e => {
    e.preventDefault();

    if (name && room) {
      socket.emit('join', name);
      socket.emit('addRoom', room, error => {
        if (!error) {
          history.push(`/#${room}[${name}]`);
        } else {
          alert('Room name already exist');
        }
      });
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("h1", null, "New Room Creation"), /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-control",
    type: "text",
    placeholder: "Username",
    onChange: handleNameChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-control",
    type: "text",
    placeholder: "Room name",
    onChange: handleRoomChange
  })), /*#__PURE__*/React.createElement("input", {
    className: "btn btn-danger",
    type: "submit",
    value: "Create",
    onClick: create
  })));
};

export default New_room;
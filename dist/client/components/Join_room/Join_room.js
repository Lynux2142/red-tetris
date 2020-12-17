import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SocketContext from '../../containers/context.js';

const JoinRoom = () => {
  const socket = useContext(SocketContext);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const history = useHistory();
  const regex = /#([a-zA-Z]+)/;
  useEffect(() => {
    setRoom(regex.exec(location.hash)[1]);
  }, [location.hash]);

  const handleChange = e => {
    setName(e.target.value);
  };

  const join = e => {
    e.preventDefault();

    if (name) {
      socket.emit('join', name);
      socket.emit('joinRoom', room, error => {
        if (!error) {
          history.push(`/#${room}[${name}]`);
        } else {
          alert('Username already taken');
        }
      });
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("h1", null, "Join \"", room, "\""), /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-control",
    placeholder: "Username",
    onChange: handleChange
  })), /*#__PURE__*/React.createElement("input", {
    className: "btn btn-danger",
    type: "submit",
    value: "Join",
    onClick: join
  })));
};

export default JoinRoom;
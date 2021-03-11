import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const JoinRoom = ({ roomName }) => {
  const [name, setName] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const join = (e) => {
    e.preventDefault();
    if (name) {
      history.push(`/#${roomName}[${name}]`);
    }
  };

  return (
    <div className='container'>
      <h1>Join "{roomName}"</h1>
      <form>
        <div className='form-group'>
          <input className='form-control' placeholder='Username' onChange={handleChange} />
        </div>
        <input className='btn btn-danger' type='submit' value='Join' onClick={join} />
      </form>
    </div>
  );
};

export default JoinRoom;

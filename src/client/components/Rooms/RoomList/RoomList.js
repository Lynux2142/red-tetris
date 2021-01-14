import React from 'react';

const RoomList = ({ rooms, createRoom, joinRoom }) => {
  return (
    <div className='container'>
      <h1>Room list</h1>
      <div className='list-group mb-3'>
      {
        Object.keys(rooms).map((key, i) => {
          return (
            <li className='list-group-item p-1' key={i}>
              <label><b>{rooms[key].name}</b> <b>({Object.keys(rooms[key].players).length})</b></label>
              <button className='btn btn-danger float-right' onClick={() => joinRoom(rooms[key].name)}>Join</button>
            </li>
          );
        })
      }
      </div>
      <button className='btn btn-danger' onClick={createRoom}>Create New Room</button>
    </div>
  );
};

export default RoomList;

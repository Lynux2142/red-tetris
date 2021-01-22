import React, { useContext } from "react";
import SocketContext from '../../containers/context.js';
import { useHistory } from 'react-router-dom';
import { StyledLeaveButton } from "../styles/StyledMenu";

const LeaveButton = () => {
  const socket = useContext(SocketContext);
  const history = useHistory();

  const leave = () => {
    socket.emit("leaveRoom");
    history.push("/Rooms");
  };

  return (
    <div>
      <StyledLeaveButton onClick={leave}>
        Leave Room
      </StyledLeaveButton>
    </div>
  );
};

export default LeaveButton;

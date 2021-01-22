import React from "react";
import { StyledTetris } from "../../styles/StyledTetris";

const Tetris = (props) => {
  return (
      <StyledTetris>
          {props.HTMLgrid}
      </StyledTetris>
  );
};

export default Tetris;

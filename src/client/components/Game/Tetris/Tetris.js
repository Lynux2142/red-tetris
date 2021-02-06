import React from "react";
import { StyledTetris } from "../../styles/StyledTetris";
import Cell from '../Cell';

const Tetris = ({ grid }) => {
  return (
      <StyledTetris>
        { grid.map(row => row.map((cell, x) => <Cell key={x} color={cell.color} />))}
      </StyledTetris>
  );
};

export default Tetris;

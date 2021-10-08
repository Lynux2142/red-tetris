import React from "react";
import { StyledTetris } from "../../styles/StyledTetris";
import Cell from '../Cell';

const Tetris = ({ grid }) => {
  return (
      <StyledTetris>
        <table>
          <tbody>{grid}</tbody>
        </table>
        {/*{ grid.map(row => row.map((cell, x) => <Cell key={x} color={cell.color} />))}*/}
      </StyledTetris>
  );
};

export default Tetris;

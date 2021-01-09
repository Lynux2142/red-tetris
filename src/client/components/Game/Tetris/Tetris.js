import React, { useEffect, useState, useContext } from "react";
import { StyledTetrisWrapper, StyledTetris } from "../../styles/StyledTetris";

const Tetris = (props) => {
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <table>
          <tbody>{props.HTMLgrid}</tbody>
        </table>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;

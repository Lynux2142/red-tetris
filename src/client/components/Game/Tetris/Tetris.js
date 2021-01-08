import React, { useEffect, useState, useContext } from "react";
import "./Tetris.css";
import { StyledTetrisWrapper, StyledTetris } from "../../styles/StyledTetris";

const Tetris = (props) => {
  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => props.handlerKeydown(e)}
    >
      <StyledTetris>
        <table>
          <tbody>{props.HTMLgrid}</tbody>
        </table>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;

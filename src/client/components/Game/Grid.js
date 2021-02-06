import React from 'react';
import { StyledGrid } from '../styles/';

import Cell from './Cell';

const Grid = ({ grid }) => (
  <StyledGrid width={Grid[0].length} height={grid.length}>
    { grid.map(row => row.map((cell, x) => <Cell key={x} color={cell.color} />))}
  </StyledGrid>
);

export default Grid;

import React from 'react';
import { StyledCell } from '../styles/StyledCell';

const Cell = (props) => (
  <StyledCell className='cell'
              color={props.color}
              key={props.key}
  />
);

export default React.memo(Cell);

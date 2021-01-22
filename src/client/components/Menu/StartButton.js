import React from 'react';
import { StyledStartButton } from '../styles/StyledMenu';

const StartButton = ({ callback }) => (
    <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
);

export default React.memo(StartButton);

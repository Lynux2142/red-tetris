import React from 'react';
import { StyledMenuButton } from '../styles/StyledMenuButton';

const MenuButton = ({ gameOver, text }) => (
    <StyledMenuButton gameOver={gameOver}>{text}</StyledMenuButton>
);

export default MenuButton;

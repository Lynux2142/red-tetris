import React from 'react';
import { StyledMenuButton } from '../styles/StyledMenu';

const MenuButton = ({ gameOver, text }) => (
    <StyledMenuButton gameOver={gameOver}>{text}</StyledMenuButton>
);

export default MenuButton;

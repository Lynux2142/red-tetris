import React from "react";
import MenuButton from "./MenuButton";
import StartButton from "./StartButton";
import SoundButton from "./SoundButton";
import LeaveButton from "./LeaveButton";
import { StyledMenu } from "../styles/StyledMenu";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Menu = (props) => {
  const { windowHeight, windowWidth } = useWindowDimensions();

  return (
    <StyledMenu
      windowWidth={windowWidth}
      windowHeight={windowHeight}>
      {props.gameOver ? (
        <MenuButton gameOver={props.gameOver} text="Game Over" />
      ) : (
            <SoundButton gameOver={props.gameOver} gameStarted={props.gameStarted} />
        )}
      <MenuButton text={`Score: ${props.score}`} />
      <StartButton callback={props.startGame} />
      <LeaveButton />
    </StyledMenu>
  );
};

export default Menu;

import React from "react";
import MenuButton from "./MenuButton";
import StartButton from "./StartButton";
import SoundButton from "./SoundButton";
import LeaveButton from "./LeaveButton";
import { StyledMenu } from "../styles/StyledMenu";

const Menu = (props) => {
  return (
    <StyledMenu>
      {props.gameOver ? (
        <MenuButton gameOver={props.gameOver} text="Game Over" />
      ) : (
        <div>
          <SoundButton />
        </div>
      )}
      <MenuButton text={`Score: ${props.score}`} />
      <StartButton callback={props.startGame} />
      <LeaveButton />
    </StyledMenu>
  );
};

export default Menu;

import React from "react";
import MenuButton from "./MenuButton";
import StartButton from "./StartButton";
import SoundButton from "./SoundButton";
import LeaveButton from "./LeaveButton";

const Menu = (props) => {
  return (
    <aside>
      {props.gameOver ? (
        <MenuButton gameOver={props.gameOver} text="Game Over" />
      ) : (
        <div>
          <SoundButton />
          <MenuButton text={`Score: ${props.score}`} />
        </div>
      )}
      <StartButton callback={props.startGame} className="btn btn-success"/>
      <LeaveButton />
    </aside>
  );
};

export default Menu;

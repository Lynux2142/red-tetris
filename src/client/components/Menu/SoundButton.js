import React, { useState, useEffect } from "react";
import { StyledVolumeButton, StyledSoundWrapper, StyledMuteButton } from "../styles/StyledMenu";
import useSound from "use-sound";
import TetrisSound from "../../audio/tetris.mp3";

const SoundButton = ( props ) => {
  const [volume, setVolume] = useState(0.1);
  const [mute, setMute] = useState(true);
  const [play, { stop }] = useSound(TetrisSound, { volume: mute ? 0 : volume });

  const muteMusic = () => {
    setMute(!mute);
  };

  const decrease = () => {
    setVolume(volume - 0.01);
  };

  const increase = () => {
    setVolume(volume + 0.01);
  };

  useEffect(() => {
    if (props.gameStarted && !props.gameOver) {
      play();
    } else {
      stop();
    }
    return () => {
      stop();
    };
  }, [play]);

  return (
    <StyledSoundWrapper>
      <StyledVolumeButton onClick={decrease}>
        -
      </StyledVolumeButton>
      <StyledMuteButton onClick={muteMusic}>
          { mute ? ( "Unmute") : ( "Mute")}
      </StyledMuteButton>
      <StyledVolumeButton onClick={increase}>
        +
      </StyledVolumeButton>
    </StyledSoundWrapper>
  );
};

export default SoundButton;

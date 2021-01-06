import React, { useState, useEffect } from "react";
import { StyledVolumeButton, StyledSoundWrapper, StyledMuteButton } from "../styles/StyledSoundButton";
import useSound from "use-sound";
import TetrisSound from "../../audio/tetris.mp3";

const SoundButton = () => {
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
    play();
    return () => {
      stop();
    };
  }, [play]);

  return (
    <StyledSoundWrapper>
      <StyledVolumeButton className="btn btn-danger" onClick={decrease}>
        -
      </StyledVolumeButton>
      <StyledMuteButton className="btn btn-danger" onClick={muteMusic}>
          { mute ? ( "Unmute") : ( "Mute")}
      </StyledMuteButton>
      <StyledVolumeButton className="btn btn-danger" onClick={increase}>
        +
      </StyledVolumeButton>
    </StyledSoundWrapper>
  );
};

export default SoundButton;

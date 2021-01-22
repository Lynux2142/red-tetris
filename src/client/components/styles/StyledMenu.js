import styled from 'styled-components';

export const StyledMenu = styled.aside`
    display: ${props => (props.windowWidth > props.windowHeight ? 'block' : 'flex')};
    width: 100%;
    padding: 0 20px;
    justify-self: center;
    align-self: center;
    text-align: center;
`;

export const StyledMenuButton = styled.div`
  box-sizing: border-box;
  margin: ${props => (props.windowWidth > props.windowHeight) ? '0 0 0 1vw' : '5vw 0 0 1vw'};
  display: flex;
  align-self: center;
  justify-content: center;
  border: 0.3em solid #333;
  height: 5vh;
  width: 15vw;
  border-radius: 20em;
  color: ${props => (props.gameOver ? 'red' : '#999')};
  background: #000;
  font-size: 1.2em;
`;

export const StyledStartButton = styled.button`
  box-sizing: border-box;
  margin: ${props => props.windowWidth > props.windowHeight ? '0 0 0 1vw' : '5vw 0 0 1vw'};
  height: 5vh;
  width: 15vw;
  border-radius: 20em;
  border: none;
  color: white;
  background: #333;
  &:hover {
    background: #191;
  }
  font-size: 1.2em;
  outline: none;
  cursor: pointer;
`;

export const StyledLeaveButton = styled.button`
  box-sizing: border-box;
  margin: ${props => (props.windowWidth > props.windowHeight ? '0 0 0 1vw' : '5vw 0 0 1vw')};
  height: 5vh;
  width: 15vw;
  border-radius: 20em;
  border: none;
  color: white;
  background: #333;
  &:hover {
    background: #D24;
  }
  font-size: 1.2em;
  outline: none;
  cursor: pointer;
`;

export const StyledSoundWrapper = styled.div`
  display: flex;
  overflow: auto;
`;

export const StyledMuteButton = styled.button`
  box-sizing: border-box;
  margin: ${props => (props.windowWidth > props.windowHeight ? '5vh 0 0 0' : '5vw 0 0 0')};
  height: ${props => (props.windowWidth > props.windowHeight ? '10vh' : '5vh')};
  width: ${props => (props.windowWidth > props.windowHeight ? '100vw' : '10vw')};
  border-radius: 15em;
  border: none;
  color: white;
  background: #333;
  &:hover {
    background: #D24;
  }
  font-size: 1em;
  outline: none;
  cursor: pointer;
`;

export const StyledVolumeButton = styled.button`
  box-sizing: border-box;
  margin: ${props => (props.windowWidth > props.windowHeight ? '5vh 0 0 0' : '5vw 0 0 0')};
  height: ${props => (props.windowWidth > props.windowHeight ? '10vh' : '5vh')};
  width: ${props => (props.windowWidth > props.windowHeight ? '4vw' : '4vw')};
  border-radius: 50%;
  border: none;
  color: white;
  background: #333;
  &:hover {
    background: #D24;
  }
  font-size: 1em;
  outline: none;
  cursor: pointer;
`;

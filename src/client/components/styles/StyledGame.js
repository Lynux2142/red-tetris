import styled from 'styled-components';

export const StyledGame = styled.div`
  display: ${props => (props.windowWidth > props.windowHeight ? 'flex' : 'block')};
  font-family: Pixel, Arial, Helvetica, sans-serif;
`;
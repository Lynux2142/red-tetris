import styled from 'styled-components';

export const StyledTetris = styled.div`
  max-width: 50%;
  margin: 2%;
  .cell {
    border: solid 1px;
    width: 2vw;
    height: 2vw;
    background: rgba(${props => props.color}, 0.8);
    border-bottom-color: rgba(${props => props.color}, 0.1);
    border-right-color: rgba(${props => props.color}, 1);
    border-top-color: rgba(${props => props.color}, 1);
    border-left-color: rgba(${props => props.color}, 0.3);
  }
`;
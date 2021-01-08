import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  padding: 3.5%;
  max-width: 50%;
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

export const StyledTetris = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;
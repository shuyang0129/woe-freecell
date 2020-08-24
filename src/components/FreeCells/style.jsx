import styled from 'styled-components';

export const FreeCells = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
`;

export const FreeCell = styled.div`
  border-radius: 5px;
  border: 2px solid rgba(252, 252, 252, 0.6);
  box-sizing: border-box;
  height: 145px;
  margin-right: 15px;
  position: relative;
  width: 95px;

  &:last-child {
    margin-right: 0;
  }
  & > :nth-child(n) {
    left: -2px;
    position: absolute;
    top: -2px;
  }
`;

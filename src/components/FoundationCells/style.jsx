import styled from 'styled-components';

export const FoundationCells = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
`;

export const FoundationCell = styled.div`
  background: rgba(252, 252, 252, 0.6);
  border-radius: 5px;
  height: 145px;
  margin-right: 15px;
  position: relative;
  width: 95px;

  &:last-child {
    margin-right: 0;
  }
  & > :nth-child(n) {
    left: 0;
    position: absolute;
    top: 0;
  }
`;

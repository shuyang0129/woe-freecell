import styled from 'styled-components';

export const FoundationCells = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
`;

export const FoundationCell = styled.div`
  background: #fcfcfc;
  border-radius: 5px;
  border: 2px solid #fcfcfc;
  height: 145px;
  margin-right: 15px;
  opacity: 0.6;
  width: 95px;

  &:last-child {
    margin-right: 0;
  }
`;

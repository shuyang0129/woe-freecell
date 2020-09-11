import styled from 'styled-components';

import { Card } from '@components/Card/style';

export const FreeCells = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
`;

export const FreeCell = styled.div`
  border-radius: 5px;
  border-color: ${({ isShowHint, isCellEmpty }) => {
    return isShowHint && isCellEmpty ? '#EF9A9A' : 'rgba(252, 252, 252, 0.6)';
  }};
  border-width: 2px;
  border-style: solid;
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
  & > ${Card} {
    border: ${({ isShowHint, isCellEmpty }) => isShowHint && !isCellEmpty && '1px solid #EF9A9A'};
  }
`;

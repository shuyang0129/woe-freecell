import * as suit from '@constants/suits';

import C from '@img/suits/C.png';
import D from '@img/suits/D.png';
import H from '@img/suits/H.png';
import S from '@img/suits/S.png';
import styled from 'styled-components';

export const FoundationCells = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
`;

export const FoundationCell = styled.div.attrs(({ suit }) => ({
  style: {
    backgroundImage: `url(${getSuitImg(suit)})`,
  },
}))`
  background-color: rgba(252, 252, 252, 0.6);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 35px 35px;
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

const getSuitImg = suitType => {
  switch (suitType) {
    case suit.HEART:
      return H;
    case suit.DIAMOND:
      return D;
    case suit.SPADE:
      return S;
    case suit.CLUB:
      return C;
    default:
      return null;
  }
};

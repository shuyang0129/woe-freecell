import styled from 'styled-components';
import { Card } from '@components/Card/style';

export const Tableau = styled.main`
  align-items: flex-start;
  display: flex;
  flex-flow: row nowrap;
  flex: 1 1 0;
  justify-content: space-between;
  margin-bottom: 81px;
  padding: 0 20px 30px;
  width: 100%;
`;

export const TableauColumn = styled.div`
  height: 100%;
  position: relative;
  width: 95px;

  & > :nth-child(n + 2) {
    box-shadow: 0 -0.5px rgba(186, 186, 186, 0.2);
    margin-top: -110px;
  }

  &::before {
    background: rgba(252, 252, 252, 0.2);
    border: ${({ isShowHint, isCellEmpty }) => isShowHint && isCellEmpty && '1px solid #EF9A9A'};
    border-radius: 5px;
    content: '';
    display: block;
    height: 145px;
    position: absolute;
    top: 0;
    width: 95px;
  }

  & > ${Card}:last-child {
    border: ${({ isShowHint, isCellEmpty }) => isShowHint && !isCellEmpty && '1px solid #EF9A9A'};
  }
`;

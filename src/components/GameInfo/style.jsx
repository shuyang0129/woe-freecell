import styled from 'styled-components';

export const GameInfo = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin-right: auto;
  padding: 0 15px;
  position: relative;
  & > span {
    color: #222;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1.4px;
    line-height: 17px;
    margin-right: 20px;
  }
  & > span:last-child {
    margin-right: 0;
  }
`;

export const InfoIcon = styled.div`
  align-items: center;
  border-radius: 50%;
  border: 2px solid #000;
  display: flex;
  height: 40px;
  justify-content: center;
  margin-right: 20px;
  width: 40px;
  & > img {
    height: 20px;
    width: 20px;
  }
`;

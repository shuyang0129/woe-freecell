import styled from 'styled-components';

export const ControllButton = styled.button`
  background: #222;
  border-radius: 50px;
  color: #fff;
  font-size: 12px;
  letter-spacing: 1.2px;
  line-height: 15px;
  padding: 12px 24px;
  text-align: center;
`;

export const ControllButtons = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;

  ${ControllButton} {
    margin-right: 15px;
  }

  &:last-child {
    margin-right: 0;
  }
`;

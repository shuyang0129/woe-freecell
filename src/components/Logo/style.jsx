import styled from 'styled-components';

export const Logo = styled.div`
  max-width: 74px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 0 23px;

  & > img {
    width: 100%;
    height: auto;
    margin-bottom: 8px;
  }

  & > h1 {
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 1.4px;
    color: #222;
  }
`;

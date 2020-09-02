import styled from 'styled-components';

export const Logo = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  margin: 0 23px;
  max-width: 74px;
  & > img {
    height: auto;
    margin-bottom: 8px;
    width: 100%;
  }
  & > h1 {
    color: #222;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1.4px;
    line-height: 17px;
    text-align: center;
    text-transform: uppercase;
  }
`;

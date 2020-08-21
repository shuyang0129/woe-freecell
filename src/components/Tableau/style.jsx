import styled from 'styled-components';

export const Tableau = styled.main`
  align-items: flex-start;
  display: flex;
  flex-flow: row nowrap;
  flex: 1 1 0;
  justify-content: space-between;
  padding: 0 20px 30px;
  width: 100%;
  margin-bottom: 81px;
`;

export const TableauColumn = styled.div`
  height: 100%;
  position: relative;
  width: 95px;

  & > :nth-child(n + 2) {
    margin-top: -120px;
    box-shadow: 0 -0.5px rgba(186, 186, 186, 0.2);
  }

  &::before {
    background: #fcfcfc;
    border-radius: 5px;
    content: '';
    display: block;
    height: 145px;
    opacity: 0.2;
    position: absolute;
    top: 0;
    width: 95px;
  }
`;
const { default: styled } = require('styled-components');

export const DragginCardsWrapper = styled.div.attrs(({ currentOffset }) => {
  let { x, y } = currentOffset;
  return {
    style: {
      display: !currentOffset && 'none',
      transform: `translate(${x}px, ${y}px)`,
    },
  };
})`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 100;
  & > :nth-child(n + 2) {
    box-shadow: 0 -0.5px rgba(186, 186, 186, 0.2);
    margin-top: -110px;
  }
`;

export const DragginCardsContainer = styled.div`
  position: 'fixed';
  pointer-events: 'none';
  z-index: 100;
  left: 0;
  top: 0;
  width: '100%';
  height: '100%';
`;

export const Card = styled.img`
  position: relative;
  display: block;
  border-radius: 5px;
  height: 145px;
  width: 95px;
  z-index: 2;
`;

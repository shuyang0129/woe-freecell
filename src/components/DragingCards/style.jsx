const { default: styled } = require('styled-components');

export const DragginCardsWrapper = styled.div.attrs(({ currentOffset }) => {
  if (!currentOffset) return;

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
  height: '100%';
  left: 0;
  pointer-events: 'none';
  position: 'fixed';
  top: 0;
  width: '100%';
  z-index: 100;
`;

export const Card = styled.img`
  border-radius: 5px;
  display: block;
  height: 145px;
  position: relative;
  width: 95px;
  z-index: 2;
`;

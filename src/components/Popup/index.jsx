import React, { useState, useEffect } from 'react';
import * as S from './style';
import Logo from '@img/logo/king_joy.png';
import cloeButtonImg from '@img/button/button_close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { startNewGame, restartGame } from '@actions/gameAction';
import { checkIsGameWin } from '@utils/freecell';

const Popup = () => {
  const [isShowPopup, setIsShowPopup] = useState(false);
  const game = useSelector(({ game }) => game);
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkIsGameWin(game)) setIsShowPopup(true);
  }, [game]);

  if (!isShowPopup) return null;

  const handleStartNewGame = () => {
    dispatch(startNewGame());
    setIsShowPopup(false);
  };

  const handleReStartNewGame = () => {
    dispatch(restartGame());
    setIsShowPopup(false);
  };

  return (
    <S.PopupOverlay>
      <S.PopupContainer>
        <S.CloseButton onClick={() => setIsShowPopup(false)}>
          <img src={cloeButtonImg} alt="Close button" />
        </S.CloseButton>
        <S.PopupContent>
          <S.Logo src={Logo} />
          <S.Title>congratulationS!</S.Title>
          <S.Description>You win the game!</S.Description>
          <S.ButtonContainer>
            <S.Button onClick={handleReStartNewGame}>PLAY AGAIN</S.Button>
            <S.Button onClick={handleStartNewGame}>NEW GAME</S.Button>
          </S.ButtonContainer>
        </S.PopupContent>
      </S.PopupContainer>
    </S.PopupOverlay>
  );
};

export default Popup;

import * as actionType from '@actions/actionTypes';

// 初始化遊玩資訊
export const initPlay = () => ({
  type: actionType.INIT_PLAY,
});

// 更新遊玩資訊
export const updatePlay = newPlayState => ({
  type: actionType.UPDATE_PLAY,
  payload: { newPlayState },
});

// 更新Game Code
export const updateGameCode = gameCode => ({
  type: actionType.UPDATE_GAMECODE,
  payload: { gameCode },
});

// 更新遊戲是否贏了
export const updateIsGameWin = isGameWin => ({
  type: actionType.UPDATE_IS_GAME_WIN,
  payload: { isGameWin },
});

// 增加步數
export const increaseMoves = () => ({
  type: actionType.INCREASE_MOVES,
});

// 更新遊戲是否開始
export const updateIsGameStarted = isGameStarted => ({
  type: actionType.UPDATE_IS_GAME_STARTED,
  payload: { isGameStarted },
});

// 重設歷史紀錄
export const resetHistoryMoves = () => ({
  type: actionType.RESET_HISTORY_MOVES,
});

// 新增歷史紀錄
export const addHistoryMoves = newGameState => ({
  type: actionType.ADD_HISTORY_MOVES,
  payload: { newGameState },
});

// 回到上一個歷史紀錄
export const popHistoryMoves = () => ({
  type: actionType.POP_HISTORY_MOVES,
});

// 更新拖曳中牌組
export const updateDraggingCards = draggingCards => ({
  type: actionType.UPDATE_DRAGGING_CARDS,
  payload: { draggingCards },
});

// 重設拖曳中牌組
export const resetDraggingCards = () => ({
  type: actionType.RESET_DRAGGING_CARDS,
});

// 更新Possible Moves
export const updatePossibleMove = possibleMove => ({
  type: actionType.UPDATE_POSSIBLE_MOVE,
  payload: { possibleMove },
});

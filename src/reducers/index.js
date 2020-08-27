import { combineReducers } from 'redux';
import { gameReducer as game } from './gameReducer';
import { playReducer as play } from './playReducer';

const rootReducer = combineReducers({
  play,
  game,
});

export default rootReducer;

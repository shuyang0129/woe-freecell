import { combineReducers } from 'redux';
import { gameReducer as game } from './gameReducer';
import { playReducer as play } from './playReducer';
import { locationReducer as locations } from './locationReducer';

const rootReducer = combineReducers({
  play,
  game,
  locations,
});

export default rootReducer;

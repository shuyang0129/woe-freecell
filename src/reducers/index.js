import { combineReducers } from 'redux';
import { gameReducer as game } from './gameReducer';

const rootReducer = combineReducers({
  game,
});

export default rootReducer;

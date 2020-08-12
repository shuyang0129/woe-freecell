import { INCREMENT, DECREMENT } from './actionTypes';

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const asyncDecrement = () => async dispatch => {
  setTimeout(() => {
    dispatch(decrement());
  }, 1000);
};

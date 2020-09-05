import * as actionType from '@actions/actionTypes';

export const locationReducer = (state = {}, action) => {
  if (action.type === actionType.UPDATE_CARD_LOCATIONS) {
    const { locations } = action.payload;
    return locations;
  }
  return state;
};

import * as actionType from './actionTypes';

export const initCardLocations = gameFromAlgorithm => {
  const locations = {};
  gameFromAlgorithm.forEach((card, order) => (locations[card] = { top: 0, left: 0, order }));

  return {
    type: actionType.UPDATE_CARD_LOCATIONS,
    payload: { locations },
  };
};

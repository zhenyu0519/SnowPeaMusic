import { getPlayerActionTypes } from "./getPlayerActionTypes";
const INITIAL_STATE = {
  player: null,
};

export const getPlayerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case getPlayerActionTypes.GET_PLAYER_SUCCESS:
      return {
        ...state,
        player: action.payload,
      };
    default:
      return state;
  }
};

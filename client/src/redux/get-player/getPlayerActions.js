import { getPlayerActionTypes } from "./getPlayerActionTypes";

const getPlayerSuccess = (player) => ({
  type: getPlayerActionTypes.GET_PLAYER_SUCCESS,
  payload: player,
});

export const getPlayer = (player) => (dispatch) => {
  dispatch(getPlayerSuccess(player));
};

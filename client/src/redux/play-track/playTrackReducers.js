import { playTrackActionTypes } from "./playTrackActionTypes";
const INITIAL_STATE = {
  isReady: false,
  isLoading: true,
  error: null,
};

export const playTrackReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case playTrackActionTypes.PLAY_TRACK_START:
      return {
        ...state,
        isLoading: true,
      };
    case playTrackActionTypes.PLAY_TRACK_SUCCESS:
      return {
        ...state,
        isReady: true,
        isLoading: false,
      };
    case playTrackActionTypes.PLAY_TRACK_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

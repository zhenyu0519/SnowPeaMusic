import { currentPlayingActionTypes } from "./currentPlayingActionTypes";
const INITIAL_STATE = {
  currentPlaying: null,
  isLoading: true,
  error: null,
};

export const currentPlayingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case currentPlayingActionTypes.GET_CURRENT_PLAYING_START:
      return {
        ...state,
        isLoading: true,
      };
    case currentPlayingActionTypes.GET_CURRENT_PLAYING_SUCCESS:
      return {
        ...state,
        currentPlaying: action.payload,
        isLoading: false,
      };
    case currentPlayingActionTypes.GET_CURRENT_PLAYING_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

import { recentPlayedTracksActionTypes } from "./recentPlayedTracksTypes";
const INITIAL_STATE = {
  recentPlayedTracks: [],
  isLoading: true,
  error: null,
};

export const recentPlayedTracksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case recentPlayedTracksActionTypes.GET_RECENT_PLAYED_TRACKS_START:
      return {
        ...state,
        isLoading: true,
      };
    case recentPlayedTracksActionTypes.GET_RECENT_PLAYED_TRACKS_SUCCESS:
      return {
        ...state,
        recentPlayedTracks: action.payload,
        isLoading: false,
      };
    case recentPlayedTracksActionTypes.GET_RECENT_PLAYED_TRACKS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

import { newReleasedTracksActionTypes } from "./newReleasedTracksActionTypes";
const INITIAL_STATE = {
  newReleasedTracks: [],
  isLoading: true,
  error: null,
};

export const newReleasedTracksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case newReleasedTracksActionTypes.GET_NEW_RELEASED_TRACKS_START:
      return {
        ...state,
        isLoading: true,
      };
    case newReleasedTracksActionTypes.GET_NEW_RELEASED_TRACKS_SUCCESS:
      return {
        ...state,
        newReleasedTracks: action.payload,
        isLoading: false,
      };
    case newReleasedTracksActionTypes.GET_NEW_RELEASED_TRACKS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

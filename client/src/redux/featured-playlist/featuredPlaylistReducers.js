import { featuredPlaylistActionTypes } from "./featuredPlaylistActionTypes";
const INITIAL_STATE = {
  featuredPlaylist: [],
  isLoading: true,
  error: null,
};

export const featuredPlaylistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case featuredPlaylistActionTypes.GET_FEATURED_PLAYLIST_START:
      return {
        ...state,
        isLoading: true,
      };
    case featuredPlaylistActionTypes.GET_FEATURED_PLAYLIST_SUCCESS:
    return {
        ...state,
        featuredPlaylist: action.payload,
        isLoading: false,
      };
    case featuredPlaylistActionTypes.GET_FEATURED_PLAYLIST_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

import { myPlaylistsActionTypes } from "./myPlaylistsActionTypes";
const INITIAL_STATE = {
  myPlaylists: [],
  isLoading: true,
  error: null,
};

export const myPlaylistsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case myPlaylistsActionTypes.GET_MY_PLAYLISTS_START:
      return {
        ...state,
        isLoading: true,
      };
    case myPlaylistsActionTypes.GET_MY_PLAYLISTS_SUCCESS:
      return {
        ...state,
        myPlaylists: action.payload,
        isLoading: false,
      };
    case myPlaylistsActionTypes.GET_MY_PLAYLISTS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

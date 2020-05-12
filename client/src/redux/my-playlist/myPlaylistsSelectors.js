import { createSelector } from "reselect";

const selectMyPlaylists = (state) => state.myPlaylists;

export const selectMyPlaylistsIsLoading = createSelector(
  [selectMyPlaylists],
  (payload) => payload.isLoading
);

export const selectMyPlaylistsList = createSelector(
  [selectMyPlaylists],
  (payload) => {
    if (payload.myPlaylists) {
      return payload.myPlaylists.items;
    }
  }
);

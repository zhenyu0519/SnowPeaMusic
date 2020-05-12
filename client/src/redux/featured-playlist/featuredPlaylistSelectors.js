import { createSelector } from "reselect";

const selectFeaturedPlaylist = (state) => state.featuredPlaylist;

export const selectFeaturedPlaylistIsLoading = createSelector(
  [selectFeaturedPlaylist],
  (payload) => payload.isLoading
);

export const selectFeaturedPlaylistItems = createSelector(
  [selectFeaturedPlaylist],
  (payload) => {
    if (payload.featuredPlaylist.playlists) {
      return payload.featuredPlaylist.playlists.items;
    }
  }
);

import { createSelector } from "reselect";

const selectNewReleasedTracks = (state) => state.newReleasedTracks;

export const selectNewReleasedTracksIsLoading = createSelector(
  [selectNewReleasedTracks],
  (payload) => payload.isLoading
);

export const selectNewReleasedTracksList = createSelector(
  [selectNewReleasedTracks],
  (payload) => {
    if (payload.newReleasedTracks.albums) {
      return payload.newReleasedTracks.albums.items;
    }
  }
);

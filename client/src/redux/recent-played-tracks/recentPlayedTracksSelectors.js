import { createSelector } from "reselect";

const selectRecentPlayedTracks = (state) => state.recentPlayedTracks;

export const selectRecentPlayedTracksIsLoading = createSelector(
  [selectRecentPlayedTracks],
  (payload) => payload.isLoading
);

export const selectRecentPlayedTracksList = createSelector(
  [selectRecentPlayedTracks],
  (payload) => {
    return payload.recentPlayedTracks.items;
  }
);

import { createSelector } from "reselect";

const selectPlayTrack = (state) => {
  return state.playTrack;
};

export const selectPlayTrackIsLoading = createSelector(
  [selectPlayTrack],
  (payload) => {
    return payload.isLoading;
  }
);

export const selectPlayTrackPlaying = createSelector(
  [selectPlayTrack],
  (payload) => payload.isReady
);

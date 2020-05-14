import { createSelector } from "reselect";

const selectCurrentPlaying = (state) => state.currentPlaying;

export const selectCurrentPlayingIsLoading = createSelector(
  [selectCurrentPlaying],
  (payload) => payload.isLoading
);

export const selectCurrentPlayingTrack = createSelector(
  [selectCurrentPlaying],
  (payload) => {
    if (payload.currentPlaying) {
      console.log('here',payload.currentPlaying)
      return payload.currentPlaying.item;
    }
  }
);

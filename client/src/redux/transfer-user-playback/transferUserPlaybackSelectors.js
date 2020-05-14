import { createSelector } from "reselect";

const selectTransferUserPlayback = (state) => {
  return state.transferUserPlayback;
};

export const selectTransferUserPlaybackIsLoading = createSelector(
  [selectTransferUserPlayback],
  (payload) => {
    return payload.isLoading;
  }
);

export const selectTransferUserPlaybackTransfered = createSelector(
  [selectTransferUserPlayback],
  (payload) => payload.isTransfered
);

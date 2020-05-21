import { createSelector } from "reselect";

const selectGetTrackAnalysis = (state) => {
  return state.getTrackAnalysis;
};

export const selectGetTrackAnalysisIsLoading = createSelector(
  [selectGetTrackAnalysis],
  (payload) => {
    return payload.isLoading;
  }
);

export const selectGetTrackAnalysisData = createSelector(
  [selectGetTrackAnalysis],
  (payload) => {
    return payload.data;
  }
);

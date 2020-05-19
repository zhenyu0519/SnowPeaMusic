import { getTrackAnalysisActionTypes } from "./getTrackAnalysisActionTypes";
const INITIAL_STATE = {
  data: false,
  isLoading: true,
  error: null,
};

export const getTrackAnalysisReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case getTrackAnalysisActionTypes.GET_TRACK_ANALYSIS_START:
      return {
        ...state,
        isLoading: true,
      };
    case getTrackAnalysisActionTypes.GET_TRACK_ANALYSIS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case getTrackAnalysisActionTypes.GET_TRACK_ANALYSIS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

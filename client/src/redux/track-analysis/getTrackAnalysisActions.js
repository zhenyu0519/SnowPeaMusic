import { getTrackAnalysisActionTypes } from "./getTrackAnalysisActionTypes";
import sendRequest from "../axiosApiConfig";

const getTrackAnalysisStart = () => ({
  type: getTrackAnalysisActionTypes.GET_TRACK_ANALYSIS_START,
});

const getTrackAnalysisSuccess = () => ({
  type: getTrackAnalysisActionTypes.GET_TRACK_ANALYSIS_SUCCESS,
});

const getTrackAnalysisFailed = (err) => ({
  type: getTrackAnalysisActionTypes.GET_TRACK_ANALYSIS_FAILED,
  payload: err,
});

export const getTrackAnalysis = (spotifyId) => (dispatch) => {
  dispatch(getTrackAnalysisStart());
  sendRequest
    .put(`audio-analysis/${spotifyId}`)
    .then(() => {
      dispatch(getTrackAnalysisSuccess());
    })
    .catch((err) => {
      dispatch(getTrackAnalysisFailed(err));
    });
};

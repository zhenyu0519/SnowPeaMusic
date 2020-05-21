import { getTrackAnalysisActionTypes } from "./getTrackAnalysisActionTypes";
import sendRequest from "../axiosApiConfig";

const getTrackAnalysisStart = () => ({
  type: getTrackAnalysisActionTypes.GET_TRACK_ANALYSIS_START,
});

const getTrackAnalysisSuccess = (data) => ({
  type: getTrackAnalysisActionTypes.GET_TRACK_ANALYSIS_SUCCESS,
  payload: data,
});

const getTrackAnalysisFailed = (err) => ({
  type: getTrackAnalysisActionTypes.GET_TRACK_ANALYSIS_FAILED,
  payload: err,
});

export const getTrackAnalysis = (spotifyId) => (dispatch) => {
  dispatch(getTrackAnalysisStart());
  sendRequest
    .get(`audio-analysis/${spotifyId}`)
    .then((res) => {
      dispatch(getTrackAnalysisSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getTrackAnalysisFailed(err));
    });
};

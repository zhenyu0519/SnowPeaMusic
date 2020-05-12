import { newReleasedTracksActionTypes } from "./newReleasedTracksActionTypes";
import sendRequest from "../axiosApiConfig";

const getNewReleasedTracksStart = () => ({
  type: newReleasedTracksActionTypes.GET_NEW_RELEASED_TRACKS_START,
});

const getNewReleasedTracksSuccess = (data) => ({
  type: newReleasedTracksActionTypes.GET_NEW_RELEASED_TRACKS_SUCCESS,
  payload: data,
});

const getNewReleasedTracksFailed = (err) => ({
  type: newReleasedTracksActionTypes.GET_NEW_RELEASED_TRACKS_FAILED,
  payload: err,
});

export const getNewReleasedTracks = () => (dispatch) => {
  dispatch(getNewReleasedTracksStart());
  sendRequest
    .get("browse/new-releases?limit=10")
    .then((res) => {
      dispatch(getNewReleasedTracksSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getNewReleasedTracksFailed(err));
    });
};

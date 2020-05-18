import { recentPlayedTracksActionTypes } from "./recentPlayedTracksTypes";
import sendRequest from "../axiosApiConfig";

const getRecentPlayedTracksStart = () => ({
  type: recentPlayedTracksActionTypes.GET_RECENT_PLAYED_TRACKS_START,
});

const getRecentPlayedTracksSuccess = (data) => ({
  type: recentPlayedTracksActionTypes.GET_RECENT_PLAYED_TRACKS_SUCCESS,
  payload: data,
});

const getRecentPlayedTracksFailed = (err) => ({
  type: recentPlayedTracksActionTypes.GET_RECENT_PLAYED_TRACKS_FAILED,
  payload: err,
});

export const getRecentPlayedTracks = () => (dispatch) => {
  dispatch(getRecentPlayedTracksStart());
  sendRequest
    .get("me/player/recently-played?limit=20")
    .then((res) => {
      dispatch(getRecentPlayedTracksSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getRecentPlayedTracksFailed(err));
    });
};

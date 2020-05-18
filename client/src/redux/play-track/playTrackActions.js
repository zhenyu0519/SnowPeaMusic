import { playTrackActionTypes } from "./playTrackActionTypes";
import sendRequest from "../axiosApiConfig";

const playTrackStart = () => ({
  type: playTrackActionTypes.PLAY_TRACK_START,
});

const playTrackSuccess = () => ({
  type: playTrackActionTypes.PLAY_TRACK_SUCCESS,
});

const playTrackFailed = (err) => ({
  type: playTrackActionTypes.PLAY_TRACK_FAILED,
  payload: err,
});

export const playTrack = (deviceId, contextUri) => (dispatch) => {
  dispatch(playTrackStart());
  sendRequest
    .put("me/player/play", {
      device_id: deviceId,
      play: true,
      context_uri: contextUri,
    })
    .then(() => {
      dispatch(playTrackSuccess());
    })
    .catch((err) => {
      dispatch(playTrackFailed(err));
    });
};

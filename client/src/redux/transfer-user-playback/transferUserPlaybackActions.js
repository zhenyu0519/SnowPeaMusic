import { transferUserPlaybackActionTypes } from "./transferUserPlaybackActionTypes";
import sendRequest from "../axiosApiConfig";

const transferUserPlaybackStart = () => ({
  type: transferUserPlaybackActionTypes.TRANSFER_USER_PLAYBACK_START,
});

const transferUserPlaybackSuccess = () => ({
  type: transferUserPlaybackActionTypes.TRANSFER_USER_PLAYBACK_SUCCESS,
});

const transferUserPlaybackFailed = (err) => ({
  type: transferUserPlaybackActionTypes.TRANSFER_USER_PLAYBACK_FAILED,
  payload: err,
});

export const transferUserPlayback = (deviceId) => (dispatch) => {
  dispatch(transferUserPlaybackStart());
  sendRequest
    .put("me/player", { device_ids: [deviceId], play: false })
    .then((res) => {
      dispatch(transferUserPlaybackSuccess());
    })
    .catch((err) => {
      dispatch(transferUserPlaybackFailed(err));
    });
};

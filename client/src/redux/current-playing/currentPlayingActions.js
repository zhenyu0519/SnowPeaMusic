import { currentPlayingActionTypes } from "./currentPlayingActionTypes";
import sendRequest from "../axiosApiConfig";

const getCurrentPlayingStart = () => ({
  type: currentPlayingActionTypes.GET_CURRENT_PLAYING_START,
});

const getCurrentPlayingSuccess = (data) => ({
  type: currentPlayingActionTypes.GET_CURRENT_PLAYING_SUCCESS,
  payload: data,
});

const getCurrentPlayingFailed = (err) => ({
  type: currentPlayingActionTypes.GET_CURRENT_PLAYING_FAILED,
  payload: err,
});

export const getCurrentPlaying = () => (dispatch) => {
  dispatch(getCurrentPlayingStart());
  sendRequest
    .get("me/player/currently-playing")
    .then((res) => {
      dispatch(getCurrentPlayingSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getCurrentPlayingFailed(err));
    });
};

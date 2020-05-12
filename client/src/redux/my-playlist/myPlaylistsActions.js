import { myPlaylistsActionTypes } from "./myPlaylistsActionTypes";
import sendRequest from "../axiosApiConfig";

const getMyPlaylistsStart = () => ({
  type: myPlaylistsActionTypes.GET_MY_PLAYLISTS_START,
});

const getMyPlaylistsSuccess = (data) => ({
  type: myPlaylistsActionTypes.GET_MY_PLAYLISTS_SUCCESS,
  payload: data,
});

const getMyPlaylistsFailed = (err) => ({
  type: myPlaylistsActionTypes.GET_MY_PLAYLISTS_FAILED,
  payload: err,
});

export const getMyPlaylists = () => (dispatch) => {
  dispatch(getMyPlaylistsStart());
  sendRequest
    .get("me/playlists?limit=5")
    .then((res) => {
      dispatch(getMyPlaylistsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getMyPlaylistsFailed(err));
    });
};

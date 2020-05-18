import { featuredPlaylistActionTypes } from "./featuredPlaylistActionTypes";
import sendRequest from "../axiosApiConfig";

const getFeaturedPlaylistStart = () => ({
  type: featuredPlaylistActionTypes.GET_FEATURED_PLAYLIST_START,
});

const getFeaturedPlaylistSuccess = (data) => ({
  type: featuredPlaylistActionTypes.GET_FEATURED_PLAYLIST_SUCCESS,
  payload: data,
});

const getFeaturedPlaylistFailed = (err) => ({
  type: featuredPlaylistActionTypes.GET_FEATURED_PLAYLIST_FAILED,
  payload: err,
});

export const getFeaturedPlaylist = () => (dispatch) => {
  dispatch(getFeaturedPlaylistStart());
  sendRequest
    .get("browse/featured-playlists?limit=20")
    .then((res) => {
      dispatch(getFeaturedPlaylistSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getFeaturedPlaylistFailed(err));
    });
};

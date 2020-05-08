import { myProfileActionTypes } from "./myProfileTypes";
import sendRequest from "../axiosApiConfig";

export const getMyProfileStart = () => ({
  type: myProfileActionTypes.GET_MY_PROFILE_START,
});

export const getMyProfileSuccess = (myProfile) => ({
  type: myProfileActionTypes.GET_MY_PROFILE_SUCCESS,
  payload: myProfile,
});

export const getMyProfileFailed = (error) => ({
  type: myProfileActionTypes.GET_MY_PROFILE_FAILED,
  payload: error,
});

export const getMyProfile = () => async (dispatch) => {
  dispatch(getMyProfileStart());
  sendRequest
    .get(`me`)
    .then((res) => {
      dispatch(getMyProfileSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getMyProfileFailed(err));
    });
};

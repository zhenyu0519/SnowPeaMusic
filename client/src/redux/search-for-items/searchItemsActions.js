import { searchItemsTypes } from "./searchItemsTypes";
import sendRequest from "../axiosApiConfig";

export const getSearchItemsStart = () => ({
  type: searchItemsTypes.GET_SEARCH_ITEMS_START,
});

export const getSearchItemsSuccess = (searchItems) => ({
  type: searchItemsTypes.GET_SEARCH_ITEMS_SUCCESS,
  payload: searchItems,
});

export const getSearchItemsFailed = (error) => ({
  type: searchItemsTypes.GET_SEARCH_ITEMS_FAILED,
  payload: error,
});

export const getSearchItems = (query) => (dispatch) => {
  dispatch(getSearchItemsStart());
  sendRequest
    .get(`search?q=${query}&type=track&market=CA&limit=50`)
    .then((res) => {
      dispatch(getSearchItemsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getSearchItemsFailed(err));
    });
};

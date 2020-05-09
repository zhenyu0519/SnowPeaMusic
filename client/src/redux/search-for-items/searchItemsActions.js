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

export const getSearchItems = (query) => async (dispatch) => {
  dispatch(getSearchItemsStart());
  sendRequest
    .get(`search?q=${query}&type=track%2Cartist&market=CA&limit=15`)
    .then((res) => {
      dispatch(getSearchItemsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getSearchItemsFailed(err));
    });
};

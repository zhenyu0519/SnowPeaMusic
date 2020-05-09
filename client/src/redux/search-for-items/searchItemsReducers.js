import { searchItemsTypes } from "./searchItemsTypes";
const INITIAL_STATE = {
  searchedItems: [],
  isLoading: true,
  error: null,
};

export const searchItemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case searchItemsTypes.GET_SEARCH_ITEMS_START:
      return {
        ...state,
        isLoading: true,
      };
    case searchItemsTypes.GET_SEARCH_ITEMS_SUCCESS:
      return {
        ...state,
        searchedItems: action.payload,
        isLoading: false,
      };
    case searchItemsTypes.GET_SEARCH_ITEMS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

import { myProfileActionTypes } from "./myProfileTypes";
const INITIAL_STATE = {
  loginedUser: null,
  isLoading: true,
  error: null,
};

export const myProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case myProfileActionTypes.GET_MY_PROFILE_START:
      return {
        ...state,
        isLoading: true,
      };
    case myProfileActionTypes.GET_MY_PROFILE_SUCCESS:
      return {
        ...state,
        loginedUser: action.payload,
        isLoading: false,
      };
    case myProfileActionTypes.GET_MY_PROFILE_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

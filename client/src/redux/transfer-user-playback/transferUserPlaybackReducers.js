import { transferUserPlaybackActionTypes } from "./transferUserPlaybackActionTypes";
const INITIAL_STATE = {
  isTransfered: false,
  isLoading: true,
  error: null,
};

export const transferUserPlaybackReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case transferUserPlaybackActionTypes.TRANSFER_USER_PLAYBACK_START:
      return {
        ...state,
        isLoading: true,
      };
    case transferUserPlaybackActionTypes.TRANSFER_USER_PLAYBACK_SUCCESS:
      return {
        ...state,
        isTransfered: true,
        isLoading: false,
      };
    case transferUserPlaybackActionTypes.TRANSFER_USER_PLAYBACK_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

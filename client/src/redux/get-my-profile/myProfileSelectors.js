import { createSelector } from "reselect";

const selectMyProfile = (state) => state.myProfile;

export const selectMyProfileIsLoading = createSelector(
  [selectMyProfile],
  (payload) => payload.isLoading
);

export const selectMyProfileLoginedUser = createSelector(
  [selectMyProfile],
  (payload) => {
    return payload.loginedUser;
  }
);

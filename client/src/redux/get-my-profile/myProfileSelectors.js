import { createSelector } from "reselect";

const selectMyProfile = (state) => state.myProfile;

export const selectMyProfileIsLoading = createSelector(
  [selectMyProfile],
  (myProfile) => myProfile.isLoading
);

export const selectMyProfileLoginedUser = createSelector(
  [selectMyProfile],
  (myProfile) => myProfile.loginedUser
);

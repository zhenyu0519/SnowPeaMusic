import { createSelector } from "reselect";

const selectPlayer = (state) => state.getPlayer;

export const selectGetPlayer = createSelector(
  [selectPlayer],
  (payload) => payload.player
);

import { createSelector } from "reselect";

const selectSearchItems = (state) => state.searchItems;

export const selectSearchItemsTracks = createSelector(
  [selectSearchItems],
  (payload) => {
    if (payload.searchedItems.tracks) {
      return payload.searchedItems.tracks.items;
    }
  }
);

export const selectSearchItemsIsLoading = createSelector(
  [selectSearchItems],
  (payload) => payload.isLoading
);

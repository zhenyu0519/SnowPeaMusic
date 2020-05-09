import { createSelector } from "reselect";

const selectSearchItems = (state) => state.searchItems;

export const selectSearchItemsList = createSelector(
  [selectSearchItems],
  (searchItems) => searchItems.searchedItems
);

export const selectSearchItemsIsLoading = createSelector(
  [selectSearchItems],
  (searchItems) => searchItems.isLoading
);

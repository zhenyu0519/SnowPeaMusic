import { createSelector } from "reselect";
import { searchItemsTypes } from "./searchItemsTypes";

const selectSearchItems = (state) => state.searchItems;

export const selectSearchItemsArtists = createSelector(
  [selectSearchItems],
  (payload) => {
    return payload.searchedItems.artists;
  }
);

export const selectSearchItemsTracks = createSelector(
  [selectSearchItems],
  (payload) => {
    return payload.searchedItems.tracks;
  }
);

export const selectSearchItemsIsLoading = createSelector(
  [selectSearchItems],
  (payload) => payload.isLoading
);

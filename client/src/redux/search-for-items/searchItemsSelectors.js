import { createSelector } from "reselect";

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
    console.log('fuck',payload.searchedItems.tracks)
    return payload.searchedItems.tracks;
  }
);

export const selectSearchItemsIsLoading = createSelector(
  [selectSearchItems],
  (payload) => payload.isLoading
);

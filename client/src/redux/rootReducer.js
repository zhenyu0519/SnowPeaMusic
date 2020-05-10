import { combineReducers } from "redux";
// import reducers
import { myProfileReducer } from "./get-my-profile/myProfileReducers";
import { searchItemsReducer } from "./search-for-items/searchItemsReducers";
import { recentPlayedTracksReducer } from "./recent-played-tracks/recentPlayedTracksReducers";

export const rootReducer = combineReducers({
  myProfile: myProfileReducer,
  searchItems: searchItemsReducer,
  recentPlayedTracks: recentPlayedTracksReducer,
});

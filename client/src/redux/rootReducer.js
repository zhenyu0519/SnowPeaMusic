import { combineReducers } from "redux";
// import reducers
import { myProfileReducer } from "./get-my-profile/myProfileReducers";
import { searchItemsReducer } from "./search-for-items/searchItemsReducers";
import { recentPlayedTracksReducer } from "./recent-played-tracks/recentPlayedTracksReducers";
import { myPlaylistsReducer } from "./my-playlist/myPlaylistsReducers";

export const rootReducer = combineReducers({
  myProfile: myProfileReducer,
  searchItems: searchItemsReducer,
  recentPlayedTracks: recentPlayedTracksReducer,
  myPlaylists: myPlaylistsReducer,
});

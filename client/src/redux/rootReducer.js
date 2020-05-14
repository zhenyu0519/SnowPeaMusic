import { combineReducers } from "redux";
// import reducers
import { myProfileReducer } from "./get-my-profile/myProfileReducers";
import { searchItemsReducer } from "./search-for-items/searchItemsReducers";
import { recentPlayedTracksReducer } from "./recent-played-tracks/recentPlayedTracksReducers";
import { myPlaylistsReducer } from "./my-playlist/myPlaylistsReducers";
import { newReleasedTracksReducer } from "./new-releases/newReleasedTracksReducers";
import { featuredPlaylistReducer } from "./featured-playlist/featuredPlaylistReducers";
import { currentPlayingReducer } from "./current-playing/currentPlayingReducers";
import { transferUserPlaybackReducer } from "./transfer-user-playback/transferUserPlaybackReducers";

export const rootReducer = combineReducers({
  myProfile: myProfileReducer,
  searchItems: searchItemsReducer,
  recentPlayedTracks: recentPlayedTracksReducer,
  myPlaylists: myPlaylistsReducer,
  newReleasedTracks: newReleasedTracksReducer,
  featuredPlaylist: featuredPlaylistReducer,
  currentPlaying: currentPlayingReducer,
  transferUserPlayback: transferUserPlaybackReducer,
});

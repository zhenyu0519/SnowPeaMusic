import React, { useEffect } from "react";
import "./MyPlaylists.scss";
// redux & actions
import { connect } from "react-redux";
import { getMyPlaylists } from "../../redux/my-playlist/myPlaylistsActions";
// reselect & selectors
import { createStructuredSelector } from "reselect";
import {
  selectMyPlaylistsIsLoading,
  selectMyPlaylistsList,
} from "../../redux/my-playlist/myPlaylistsSelectors";
// components
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";
import { CollapsibleContent } from "../collapsible-content/CollapsibleContent";

const MyPlaylists = ({ isLoading, myPlaylists, getMyPlaylists, open }) => {
  useEffect(() => {
    if (!open) {
      return;
    }
    getMyPlaylists();
  }, [open, getMyPlaylists]);
  return (
    <div className="my-playlists-container">
      {console.log("open", open, "isLoading", isLoading)}
      {open && !isLoading ? (
        <div className="my-playlists">
          {myPlaylists.map((playlist) => (
            <CollapsibleContent
              key={playlist.id}
              imageUrl={playlist.images[1].url}
              name={playlist.name}
              total={playlist.tracks.total}
            />
          ))}
        </div>
      ) : open && isLoading ? (
        <LoadingSpinner />
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectMyPlaylistsIsLoading,
  myPlaylists: selectMyPlaylistsList,
});

const mapDispatchToProps = (dispatch) => ({
  getMyPlaylists: () => dispatch(getMyPlaylists()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPlaylists);

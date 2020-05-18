import React, { useEffect } from "react";
import "./FeaturedPlaylist.scss";
// redux & actions
import { connect } from "react-redux";
import { getFeaturedPlaylist } from "../../redux/featured-playlist/featuredPlaylistActions";
// reselect & selectors
import { createStructuredSelector } from "reselect";
import {
  selectFeaturedPlaylistIsLoading,
  selectFeaturedPlaylistItems,
} from "../../redux/featured-playlist/featuredPlaylistSelectors";
// components
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";
import CollapsibleContent from "../collapsible-content/CollapsibleContent";

const FeaturedPlaylist = ({
  isLoading,
  featuredPlaylistItems,
  getFeaturedPlaylist,
  open,
}) => {
  useEffect(() => {
    if (!open) {
      return;
    }
    getFeaturedPlaylist();
  }, [open, getFeaturedPlaylist]);
  return (
    <div className="featured-playlist-container">
      {open && !isLoading ? (
        <div className="featured-playlist">
          {featuredPlaylistItems.map((item) => (
            <CollapsibleContent
              key={item.id}
              imageUrl={item.images[0].url}
              name={item.name}
              descrption={item.descrption}
              contextUri={item.uri}
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
  isLoading: selectFeaturedPlaylistIsLoading,
  featuredPlaylistItems: selectFeaturedPlaylistItems,
});

const mapDispatchToProps = (dispatch) => ({
  getFeaturedPlaylist: () => dispatch(getFeaturedPlaylist()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedPlaylist);

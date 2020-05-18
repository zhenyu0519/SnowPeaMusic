import React, { useEffect } from "react";
import "./NewReleased.scss";
// redux & actions
import { connect } from "react-redux";
import { getNewReleasedTracks } from "../../redux/new-releases/newReleasedTracksActions";
// reselect & selectors
import { createStructuredSelector } from "reselect";
import {
  selectNewReleasedTracksIsLoading,
  selectNewReleasedTracksList,
} from "../../redux/new-releases/newReleasedTracksSelectors";
// components
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";
import CollapsibleContent from "../collapsible-content/CollapsibleContent";

const NewReleased = ({
  isLoading,
  newReleasedTracks,
  getNewReleasedTracks,
  open,
}) => {
  useEffect(() => {
    if (!open) {
      return;
    }
    getNewReleasedTracks();
  }, [open, getNewReleasedTracks]);
  return (
    <div className="my-new-released-container">
      {open && !isLoading ? (
        <div className="my-new-released">
          {newReleasedTracks.map((track) => (
            <CollapsibleContent
              key={track.id}
              imageUrl={track.images[1].url}
              name={track.name}
              total={track.total}
              contextUri={track.uri}
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
  isLoading: selectNewReleasedTracksIsLoading,
  newReleasedTracks: selectNewReleasedTracksList,
});

const mapDispatchToProps = (dispatch) => ({
  getNewReleasedTracks: () => dispatch(getNewReleasedTracks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewReleased);

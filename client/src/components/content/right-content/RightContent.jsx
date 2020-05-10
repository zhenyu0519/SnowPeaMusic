import React,{useEffect} from "react";
import "./RightContent.scss";
// redux & actions
import { connect } from "react-redux";
import { getRecentPlayedTracks } from "../../../redux/recent-played-tracks/recentPlayedTracksActions";
// selectors
import { createStructuredSelector } from "reselect";
import {
  selectRecentPlayedTracksIsLoading,
  selectRecentPlayedTracksList,
} from "../../../redux/recent-played-tracks/recentPlayedTracksSelectors";
// components
import { Title } from "../../title/Title";
import { LoadingSpinner } from "../../loading-spinner/LoadingSpinner";

const RightContent = ({
  isLoading,
  recentPlayedTracks,
  getRecentPlayedTracks,
}) => {
  useEffect(() => {
    getRecentPlayedTracks();
  }, [getRecentPlayedTracks]);
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="right-content-container">
      <Title title="Recent Played" />
      {console.log(recentPlayedTracks)}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectRecentPlayedTracksIsLoading,
  recentPlayedTracks: selectRecentPlayedTracksList,
});

const mapDispatchToProps = (dispatch) => ({
  getRecentPlayedTracks: () => dispatch(getRecentPlayedTracks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RightContent);

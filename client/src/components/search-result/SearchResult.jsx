import React from "react";
import "./SearchResult.scss";
// redux
import { connect } from "react-redux";
import { playTrack } from "../../redux/play-track/playTrackActions";

const SearchResult = ({
  imageUrl,
  trackName,
  artists,
  contextUri,
  playTrack,
  setInput,
}) => {
  const deviceId = localStorage.getItem("device_id");
  const playTrackHandler = () => {
    playTrack(deviceId, contextUri);
    // clean the input query to close the search results
    setInput("");
  };
  return (
    <div className="result-content" onClick={playTrackHandler}>
      <img src={imageUrl} alt={trackName} />
      <div className="track-name">
        {trackName} (
        {artists.map((artist, index) => {
          return index === artists.length - 1
            ? artist.name
            : artist.name + " & ";
        })}
        )
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  playTrack: (deviceId, contextUri) =>
    dispatch(playTrack(deviceId, contextUri)),
});

export default connect(null, mapDispatchToProps)(SearchResult);

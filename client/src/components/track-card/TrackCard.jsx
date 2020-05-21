import React from "react";
import "./TrackCard.scss";
// redux
import { connect } from "react-redux";
import { playTrack } from "../../redux/play-track/playTrackActions";
// font icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
// components
import { Title } from "../title/Title";

const TrackCard = ({ album, artists, name, playTrack }) => {
  const deviceId = localStorage.getItem("device_id");
  const contextUri = album.uri;
  const playTrackHandler = () => {
    playTrack(deviceId, contextUri);
  };
  return (
    <div className="card-container" onClick={playTrackHandler}>
      <img src={album.images[0].url} alt={name} />
      <FontAwesomeIcon className="play-icon" icon={faPlayCircle} />
      <div className="card">
        <Title title={name} />
        {/* <div className="track-name">{name}</div> */}
        <div className="track-artists">
          {artists.map((artist, index) => {
            return index === artists.length - 1
              ? artist.name
              : artist.name + " & ";
          })}
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({
//   player: selectGetPlayer,
// });

const mapDispatchToProps = (dispatch) => ({
  playTrack: (deviceId, contextUri) =>
    dispatch(playTrack(deviceId, contextUri)),
});

export default connect(null, mapDispatchToProps)(TrackCard);

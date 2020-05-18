import React from "react";
import "./CollapsibleContent.scss";
// redux
import { connect } from "react-redux";
import { playTrack } from "../../redux/play-track/playTrackActions";

const CollapsibleContent = ({
  imageUrl,
  name,
  total,
  descrption,
  contextUri,
  playTrack,
}) => {
  const deviceId = localStorage.getItem("device_id");
  const playTrackHandler = () => {
    playTrack(deviceId, contextUri);
  };
  return (
    <div className="collapsible-content-container" onClick={playTrackHandler}>
      <img src={imageUrl} alt={name} />
      <div className="card">
        <div>{name}</div>
        {total ? <div>{`${total} tracks `}</div> : <div>{descrption}</div>}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  playTrack: (deviceId, contextUri) =>
    dispatch(playTrack(deviceId, contextUri)),
});

export default connect(null, mapDispatchToProps)(CollapsibleContent);

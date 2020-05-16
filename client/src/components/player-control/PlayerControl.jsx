import React, { useState, useEffect } from "react";
import "./PlayerControl.scss";
// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { faPauseCircle } from "@fortawesome/free-regular-svg-icons";
import { faStepForward } from "@fortawesome/free-solid-svg-icons";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";

export const PlayerControl = ({ player, currentTrack, position, duration }) => {
  const [isplaying, setisplaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position);

  const onTogglePlayClick = () => {
    setisplaying(!isplaying);
    return player.togglePlay();
  };
  const onPrevTrackClick = () => player.previousTrack();
  const onNextTrackClick = () => player.nextTrack();

  useEffect(() => {
    if (!isplaying) return;
    const progress = setInterval(() => {
      setCurrentPosition(currentPosition + 500);
    }, 500);
    return () => clearInterval(progress);
  }, [isplaying, currentPosition]);

  useEffect(() => {
    setCurrentPosition(position);
  }, [position, duration]);

  const getPosition = () => {
    return currentPosition.toString();
  };

  const dragTheBar = (event) => {
    let newPosition = parseInt(event.target.value);
    player.seek(newPosition).then(() => {
      console.log("Changed position!");
    });
    setCurrentPosition(newPosition);
  };

  const getRatio = () => {
    return ((currentPosition / duration) * 100).toFixed(1);
  };

  return (
    <div className="player-control-container">
      {console.log("currentPosition", currentPosition)}
      <input
        className="draggable-progress-bar"
        type="range"
        value={getPosition()}
        min="0"
        max={duration.toString()}
        onChange={(event) => dragTheBar(event)}
        style={{
          background: `linear-gradient(to right, #e6e6e6 0%, #1db954 ${getRatio()}%, #e6e6e6  ${getRatio()}%, #e6e6e6 100%)`,
        }}
      />
      <div className="player-button-group">
        <button className="pre-button" onClick={() => onPrevTrackClick()}>
          <FontAwesomeIcon
            className="player-button-icon"
            icon={faStepBackward}
          />
        </button>
        <button
          className="play-and-pause-button"
          onClick={() => onTogglePlayClick()}
        >
          <FontAwesomeIcon
            className="player-button-icon"
            icon={isplaying ? faPauseCircle : faPlayCircle}
          />
        </button>
        <button className="next-button" onClick={() => onNextTrackClick()}>
          <FontAwesomeIcon
            className="player-button-icon"
            icon={faStepForward}
          />
        </button>
        <button className="volume-button">
          <FontAwesomeIcon className="player-button-icon" icon={faVolumeUp} />
        </button>
        <button className="mute-button">
          <FontAwesomeIcon className="player-button-icon" icon={faVolumeMute} />
        </button>
      </div>
    </div>
  );
};

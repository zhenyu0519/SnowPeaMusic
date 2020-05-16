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
      setCurrentPosition(currentPosition + 1000);
    }, 1000);
    return () => clearInterval(progress);
  }, [isplaying, currentPosition]);

  useEffect(() => {
    if (position & duration) {
      setCurrentPosition(position);
    }
  }, [position, duration]);

  const getWidth = () => {
    return ((currentPosition / duration) * 100).toFixed(2) + "%";
  };

  return (
    <div className="player-control-container">
      <div className="player-progress-group">
        <div
          className="player-progress-point"
          style={{ left: getWidth() }}
        ></div>
        <div
          className="player-progress-bar"
          style={{ width: getWidth() }}
        ></div>
      </div>

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

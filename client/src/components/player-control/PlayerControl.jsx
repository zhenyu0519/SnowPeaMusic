import React from "react";
import "./PlayerControl.scss";
// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import { faStepForward } from "@fortawesome/free-solid-svg-icons";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";

export const PlayerControl = () => {
  return (
    <div className="player-control-group">
      <div className="player-progress-group">
        <div className="player-progress-point"></div>
        <div className="player-progress-bar"></div>
      </div>
      <div className="player-button-group">
        <button className="play-and-pause-button">
          <FontAwesomeIcon className="player-button-icon" icon={faPlay} />
        </button>
        <button className="stop-button">
          <FontAwesomeIcon className="player-button-icon" icon={faStop} />
        </button>
        <button className="pre-button">
          <FontAwesomeIcon
            className="player-button-icon"
            icon={faStepBackward}
          />
        </button>
        <button className="next-button">
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

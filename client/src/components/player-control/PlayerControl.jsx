import React, { useState, useEffect } from "react";
import "./PlayerControl.scss";
import { millisToMinutesAndSeconds } from "../../utils/millisToMinutesAndSeconds";
// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { faPauseCircle } from "@fortawesome/free-regular-svg-icons";
import { faStepForward } from "@fortawesome/free-solid-svg-icons";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";

export const PlayerControl = ({
  player,
  currentTrack,
  position,
  duration,
  isPlaying,
}) => {
  const [currentPosition, setCurrentPosition] = useState(position);
  const [isMuted, setMuted] = useState(false);
  const [volume, setVolume] = useState("50");
  const [preVolume, setPreVolume] = useState("50");
  const [currentTime, setCurrentTime] = useState("0:00");

  // play or pause the track
  const onTogglePlayClick = () => {
    return player.togglePlay();
  };
  // previous track
  const onPrevTrackClick = () => {
    return player.previousTrack();
  };

  // next track
  const onNextTrackClick = () => {
    return player.nextTrack();
  };
  // mute the track
  const toggleMuted = () => {
    setPreVolume(volume);
    if (!isMuted) {
      player.setVolume(0);
    } else {
      player.setVolume(parseInt(preVolume) / 100);
    }
    setMuted(!isMuted);
  };

  // player thumb will update the current position every 1 second
  useEffect(() => {
    if (!isPlaying) return;
    const progress = setInterval(() => {
      setCurrentPosition(currentPosition + 1000);
      // update current positoion to minute and seconds every 1 second
      setCurrentTime(millisToMinutesAndSeconds(currentPosition));
    }, 1000);
    return () => clearInterval(progress);
  }, [isPlaying, currentPosition]);

  // every time the position changed will be update, ex. next track, previous track or drag the track to expected position
  useEffect(() => {
    setCurrentPosition(position);
    setCurrentTime(millisToMinutesAndSeconds(position));
  }, [position, duration]);

  // get the converted current position (string)
  const getPosition = () => {
    return currentPosition.toString();
  };

  // drag to adjust positon of track
  const dragTheProgressBar = (event) => {
    let newPosition = parseInt(event.target.value);
    player.seek(newPosition);
    setCurrentPosition(newPosition);
  };

  // drag to adjust volume
  const dragTheVolumeBar = (event) => {
    let newVolume = parseInt(event.target.value);
    if (newVolume === 0) {
      setMuted(true);
    }
    setVolume(newVolume);
    player.setVolume(newVolume / 100);
  };

  // to calculation the width ratio of the played parts of the track, this is used to display the position of the thumb and runned track
  const getRatio = () => {
    return ((currentPosition / duration) * 100).toFixed(1);
  };

  return (
    <div className="player-control-container">
      <div className="draggable-progress-bar-group">
        <div className="current-position">{currentTime}</div>
        <input
          className="draggable-progress-bar"
          type="range"
          value={getPosition()}
          min="0"
          max={duration.toString()}
          onChange={(event) => dragTheProgressBar(event)}
          style={{
            background: `linear-gradient(to right, #e6e6e6 0%, #1db954 ${getRatio()}%, #e6e6e6  ${getRatio()}%, #e6e6e6 100%)`,
          }}
        />
        <div className="duration">{millisToMinutesAndSeconds(duration)}</div>
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
            className="play-pause-icon"
            icon={isPlaying ? faPauseCircle : faPlayCircle}
          />
        </button>
        <button className="next-button" onClick={() => onNextTrackClick()}>
          <FontAwesomeIcon
            className="player-button-icon"
            icon={faStepForward}
          />
        </button>
        <div className="volume-group">
          {!isMuted ? (
            <React.Fragment>
              <button
                className="unmuted-button"
                onClick={(event) => toggleMuted(event)}
              >
                <FontAwesomeIcon
                  className="player-button-icon"
                  icon={faVolumeUp}
                />
              </button>
              <input
                className="volume-bar"
                type="range"
                value={volume}
                min="1"
                max="100"
                onChange={(event) => dragTheVolumeBar(event)}
                style={{
                  background: `linear-gradient(to right, #e6e6e6 0%, #1db954 ${volume}%, #e6e6e6  ${volume}%, #e6e6e6 100%)`,
                }}
              />
              <div className="current-volume"> {volume} </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button
                className="muted-button"
                onClick={(event) => toggleMuted(event)}
              >
                <FontAwesomeIcon
                  className="player-button-icon"
                  icon={faVolumeMute}
                />
              </button>
              <input
                className="volume-bar"
                type="range"
                value={volume}
                min="0"
                max="100"
                disabled
                onChange={(event) => dragTheVolumeBar(event)}
                style={{
                  background: `linear-gradient(to right, #e6e6e6 0%, #e6e6e6 ${volume}%, #e6e6e6  ${volume}%, #e6e6e6 100%)`,
                  visibility: "hidden",
                }}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

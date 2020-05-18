import React from "react";
import "./Player.scss";

export const Player = ({
  imageUrl,
  albumName,
  trackName,
  artists,
  isPlaying,
}) => {
  return (
    <div className="current-track-container">
      <img
        src={imageUrl}
        alt={albumName}
        className="album-cover"
        style={{ animationPlayState: isPlaying ? "running" : "paused" }}
      />
      <div className="track-info">
        <div className="track-name">{trackName} ( {albumName} )</div>
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

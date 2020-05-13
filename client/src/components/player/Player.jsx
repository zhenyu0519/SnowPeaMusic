import React from "react";
import "./Player.scss";

export const Player = ({ imageUrl, albumName, trackName, artists }) => {
  return (
    <div className="current-track-container">
      {console.log(albumName)}
      <img src={imageUrl} alt={albumName} />
      <div className="track-info">
        <div className="album-name">{albumName}</div>
        <div className="track-name">{trackName}</div>
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

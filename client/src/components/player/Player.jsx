import React from "react";
import "./Player.scss";
// components
import { Title } from "../title/Title";

export const Player = ({
  imageUrl,
  albumName,
  trackName,
  artists,
  isPlaying,
  prevTrack,
  nextTrack,
}) => {
  return (
    <div className="track-container">
      <div className="previous-track-group">
        <img
          src={prevTrack.images[0].url}
          alt={prevTrack.name}
          className="prev-album-cover"
        />
        <div className="track-info">
          <Title title={prevTrack.name} h4 />
        </div>
      </div>

      <div className="current-track-group">
        <img
          src={imageUrl}
          alt={albumName}
          className="album-cover"
          style={{ animationPlayState: isPlaying ? "running" : "paused" }}
        />
        <div className="track-info">
          <Title title={`${trackName} \xa0\xa0 ( album: ${albumName} )`} />
          <div className="track-artists">
            {artists.map((artist, index) => {
              return index === artists.length - 1
                ? artist.name
                : artist.name + " & ";
            })}
          </div>
        </div>
      </div>

      <div className="next-track-group">
        <img
          src={nextTrack.images[0].url}
          alt={nextTrack.name}
          className="next-album-cover"
        />
        <div className="track-info">
          <Title title={nextTrack.name} h4 />
        </div>
      </div>
    </div>
  );
};

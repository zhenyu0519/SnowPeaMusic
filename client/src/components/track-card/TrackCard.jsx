import React from "react";
import "./TrackCard.scss";

export const TrackCard = ({ album, artists, name }) => {
  return (
    <div className="card-container">
      <img src={album.images[0].url} alt={name} />
      <div className="card">
        <div className="track-name">{name}</div>
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

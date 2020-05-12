import React, { useState } from "react";
import "./LeftContent.scss";
import MyPlaylists from "../../my-playlist/MyPlaylists";
// components
import { Title } from "../../title/Title";

const LeftContent = () => {
  const [isMyPlaylistOpen, setMyPlaylistOpen] = useState(false);
  return (
    <div className="left-content-container">
      <Title title="Browse" />
      <div className="button-group">
        <button
          className="my-playlists-button"
          onClick={() => setMyPlaylistOpen(!isMyPlaylistOpen)}
        >
          My Playlists
        </button>
      </div>
      <div className="browse-container">
        <MyPlaylists open={isMyPlaylistOpen} />
      </div>
    </div>
  );
};

export default LeftContent;

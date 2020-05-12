import React, { useState } from "react";
import "./LeftContent.scss";
import MyPlaylists from "../../my-playlist/MyPlaylists";
import NewReleased from "../../new-releases/NewReleased";
// components
import { Title } from "../../title/Title";

const LeftContent = () => {
  const [isMyPlaylistOpen, setMyPlaylistOpen] = useState(false);
  const [isNewReleasedOpen, setNewReleasedOpen] = useState(false);
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
        <button
          className="new-released-button"
          onClick={() => setNewReleasedOpen(!isNewReleasedOpen)}
        >
          New Released
        </button>
      </div>
      <div className="browse-container">
        <MyPlaylists open={isMyPlaylistOpen} />
        <NewReleased open={isNewReleasedOpen} />
      </div>
    </div>
  );
};

export default LeftContent;

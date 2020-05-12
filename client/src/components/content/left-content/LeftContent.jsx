import React, { useState } from "react";
import "./LeftContent.scss";
import MyPlaylists from "../../my-playlist/MyPlaylists";
import NewReleased from "../../new-releases/NewReleased";
import FeaturedPlaylist from "../../featured-playlist/FeaturedPlaylist";
// components
import { Title } from "../../title/Title";

const LeftContent = () => {
  const [isMyPlaylistOpen, setMyPlaylistOpen] = useState(false);
  const [isNewReleasedOpen, setNewReleasedOpen] = useState(false);
  const [isFeaturedListOpen, setFeaturedListOpen] = useState(false);
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
        <button
          className="new-featured-playlist-button"
          onClick={() => setFeaturedListOpen(!isFeaturedListOpen)}
        >
          Editor's Pick
        </button>
      </div>
      <div className="browse-container">
        <MyPlaylists open={isMyPlaylistOpen} />
        <NewReleased open={isNewReleasedOpen} />
        <FeaturedPlaylist open={isFeaturedListOpen} />
      </div>
    </div>
  );
};

export default LeftContent;

import React, { useState, useEffect } from "react";
import "./LeftContent.scss";
import MyPlaylists from "../../my-playlist/MyPlaylists";
import NewReleased from "../../new-releases/NewReleased";
import FeaturedPlaylist from "../../featured-playlist/FeaturedPlaylist";
// components
import { Title } from "../../title/Title";
// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons";

const LeftContent = () => {
  const [isMyPlaylistOpen, setMyPlaylistOpen] = useState(true);
  const [isNewReleasedOpen, setNewReleasedOpen] = useState(false);
  const [isFeaturedListOpen, setFeaturedListOpen] = useState(false);

  useEffect(() => {
    if (isMyPlaylistOpen) {
      setNewReleasedOpen(false);
      setFeaturedListOpen(false);
    }
  }, [isMyPlaylistOpen]);

  useEffect(() => {
    if (isNewReleasedOpen) {
      setMyPlaylistOpen(false);
      setFeaturedListOpen(false);
    }
  }, [isNewReleasedOpen]);

  useEffect(() => {
    if (isFeaturedListOpen) {
      setNewReleasedOpen(false);
      setMyPlaylistOpen(false);
    }
  }, [isFeaturedListOpen]);

  return (
    <div className="left-content-container">
      <Title title="Browse Playlists" />
      <div className="button-group">
        <button
          className="my-playlists-button"
          onClick={() => setMyPlaylistOpen(!isMyPlaylistOpen)}
        >
          My Playlists
          {isMyPlaylistOpen ? (
            <FontAwesomeIcon
              className="menu-icon-down"
              icon={faArrowAltCircleDown}
            />
          ) : (
            <FontAwesomeIcon
              className="menu-icon-up"
              icon={faArrowAltCircleUp}
            />
          )}
        </button>
        <button
          className="new-released-button"
          onClick={() => setNewReleasedOpen(!isNewReleasedOpen)}
        >
          New Released
          {isNewReleasedOpen ? (
            <FontAwesomeIcon
              className="menu-icon-down"
              icon={faArrowAltCircleDown}
            />
          ) : (
            <FontAwesomeIcon
              className="menu-icon-up"
              icon={faArrowAltCircleUp}
            />
          )}
        </button>
        <button
          className="new-featured-playlist-button"
          onClick={() => setFeaturedListOpen(!isFeaturedListOpen)}
        >
          Editor's Pick
          {isFeaturedListOpen ? (
            <FontAwesomeIcon
              className="menu-icon-down"
              icon={faArrowAltCircleDown}
            />
          ) : (
            <FontAwesomeIcon
              className="menu-icon-up"
              icon={faArrowAltCircleUp}
            />
          )}
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

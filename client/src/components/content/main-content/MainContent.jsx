import React, { Component } from "react";
import "./MainContent.scss";
// utils
import { getAccessToken } from "../../../utils/getAccessToken";
// components
import { Title } from "../../title/Title";
import { Player } from "../../player/Player";
import { PlayerControl } from "../../player-control/PlayerControl";

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: getAccessToken(),
      deviceId: "",
      player: null,
      currentTrack: null,
      previousTracks: [],
      nextTracks: [],
    };
    this.playerCheckInterval = null;
  }

  componentDidMount() {
    if (this.state.token) {
      // check every second for the player.
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }
  }

  checkForPlayer() {
    const { token } = this.state;
    if (window.Spotify) {
      clearInterval(this.playerCheckInterval);
      // The main constructor for initializing the Web Playback SDK.
      // It should contain an object with the player name, volume and access token.
      this.setState({
        player: new window.Spotify.Player({
          name: "Jeffrey's Spotify Player",
          getOAuthToken: (callback) => {
            callback(token);
          },
          volume: 0.5,
        }),
      });
      this.createEventHandlers();

      // finally, connect!
      // Connect to Web Playback SDK instance to Spotify with the credentials provided during initialization.
      this.state.player.connect().then((success) => {
        if (success) {
          console.log(
            "The Web Playback SDK successfully connected to Spotify!"
          );
        }
      });
    }
  }

  createEventHandlers() {
    const { player } = this.state;
    // Create a new event listener in the Web Playback SDK.
    player.on("initialization_error", (e) => {
      console.error(e);
    });

    player.on("account_error", (e) => {
      console.error(e);
    });
    player.on("playback_error", (e) => {
      console.error(e);
    });

    // Playback status updates
    player.on("player_state_changed", (state) => {
      this.setState({
        currentTrack: state.track_window.current_track,
        previousTrack: state.track_window.previous_tracks,
        nextTracks: state.track_window.next_tracks,
      });
      console.log(state);
    });

    // const playNextTracks = ()=>{
    //   player.nextTrack()
    // }

    // Ready
    player.on("ready", (data) => {
      let { device_id } = data;
      this.setState({ deviceId: device_id });
    });
  }

  render() {
    const { currentTrack, previousTracks, nextTracks, player } = this.state;
    return (
      <div className="main-content-container">
        <Title title="current playing..." />
        <div className="player-container">
          {console.log("currentTrack", currentTrack)}
          {currentTrack ? (
            <Player
              imageUrl={currentTrack.album.images[0].url}
              albumName={currentTrack.album.name}
              trackName={currentTrack.name}
              artists={currentTrack.artists}
            />
          ) : null}
        </div>
        <PlayerControl />
      </div>
    );
  }
}

export default MainContent;

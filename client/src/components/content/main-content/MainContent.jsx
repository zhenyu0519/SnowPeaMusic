import React, { Component } from "react";
import "./MainContent.scss";
// redux & actions
import { connect } from "react-redux";
import { transferUserPlayback } from "../../../redux/transfer-user-playback/transferUserPlaybackActions";
import { getPlayer } from "../../../redux/get-player/getPlayerActions";
import { getTrackAnalysis } from "../../../redux/track-analysis/getTrackAnalysisActions";
// reselect & selecotrs
import { createStructuredSelector } from "reselect";
import {
  selectTransferUserPlaybackTransfered,
  selectTransferUserPlaybackIsLoading,
} from "../../../redux/transfer-user-playback/transferUserPlaybackSelectors";
// utils
import { getAccessToken, clearTokens } from "../../../utils/getAccessToken";
// components
import { Player } from "../../player/Player";
import { PlayerControl } from "../../player-control/PlayerControl";
import { Title } from "../../title/Title";
import defaultBG from "../../../assets/record_bg.jpg";

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: getAccessToken(),
      deviceId: "",
      player: null,
      currentTrack: null,
      duration: 0,
      position: 0,
      paused: true,
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
          name: "Jeffrey's Spotify Web Player",
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
      if (state && state.track_window) {
        // this.props.getTrackAnalysis(state.track_window.current_track.id)
        this.setState({
          paused: state.paused,
          duration: state.duration,
          position: state.position,
          currentTrack: state.track_window.current_track,
          previousTracks: state.track_window.previous_tracks,
          nextTracks: state.track_window.next_tracks,
        });
      } else {
        clearTokens();
        window.location.reload();
      }
    });

    // Ready
    player.on("ready", (data) => {
      let { device_id } = data;
      this.props.transferUserPlayback(device_id);
      this.setState({ deviceId: device_id });
    });
  }

  // disconnect player after unmount
  componentWillUnmount() {
    this.state.player.disconnect();
    localStorage.removeItem("device_id");
  }

  render() {
    const {
      currentTrack,
      player,
      duration,
      position,
      paused,
      previousTracks,
      nextTracks,
    } = this.state;
    return (
      <div className="main-content-container">
        <Title title={`Welcome, ${this.props.loginedUser.display_name}`} />
        <div className="player-container">
          {currentTrack ? (
            <Player
              imageUrl={
                currentTrack.album.images &&
                currentTrack.album.images.length > 0
                  ? currentTrack.album.images[0].url
                  : defaultBG
              }
              albumName={currentTrack.album.name}
              trackName={currentTrack.name}
              artists={currentTrack.artists}
              isPlaying={!paused}
              prevTrack={
                previousTracks.length
                  ? previousTracks[previousTracks.length - 1]
                  : currentTrack
              }
              nextTrack={nextTracks.length ? nextTracks[0] : currentTrack}
            />
          ) : (
            <img
              src={defaultBG}
              alt='default'
              className="default-album-cover"
            />
          )}
        </div>
        {player ? (
          <PlayerControl
            player={player}
            currentTrack={currentTrack}
            position={position}
            duration={duration}
            isPlaying={!paused}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isTransfering: selectTransferUserPlaybackIsLoading,
  isTransfered: selectTransferUserPlaybackTransfered,
});

const mapDispatchToProps = (dispatch) => ({
  transferUserPlayback: (deviceId) => dispatch(transferUserPlayback(deviceId)),
  getPlayer: (player) => dispatch(getPlayer(player)),
  getTrackAnalysis: (spotifyId) => dispatch(getTrackAnalysis(spotifyId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MainContent);

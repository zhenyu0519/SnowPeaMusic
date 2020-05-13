import React, { Component } from "react";
import "./HomePage.scss";
// reselect & seletors
import { createStructuredSelector } from "reselect";
import {
  selectMyProfileLoginedUser,
  selectMyProfileIsLoading,
} from "../../redux/get-my-profile/myProfileSelectors";
// redux
import { connect } from "react-redux";
// actions
import { getMyProfile } from "../../redux/get-my-profile/myProfileActions";
// components
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import Header from "../../components/header/Header";
import LeftContent from "../../components/content/left-content/LeftContent";
import RightContent from "../../components/content/right-content/RightContent";
import MainContent from "../../components/content/main-content/MainContent";
// utils
import { getAccessToken } from "../../utils/getAccessToken";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myProfile: this.props.myProfile,
      token: getAccessToken(),
      deviceId: "",
      player: null,
    };
    this.playerCheckInterval = null;
  }

  componentDidMount() {
    this.props.getMyProfile();
    if (this.state.token !== "") {
      this.setState({ loggedIn: true });
      // check every second for the player.
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }
  }

  checkForPlayer() {
    const { token } = this.state;
    if (window.Spotify !== null) {
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
      console.log("something here", this.state.player);
    }
  }

  createEventHandlers() {
    const { player } = this.state;
    // Create a new event listener in the Web Playback SDK.
    player.on("initialization_error", (e) => {
      console.error(e);
    });
    // player.on("authentication_error", (e) => {
    //   console.error(e);
    //   this.setState({ loggedIn: false });
    // });
    player.on("account_error", (e) => {
      console.error(e);
    });
    player.on("playback_error", (e) => {
      console.error(e);
    });

    // Playback status updates
    player.on("player_state_changed", (state) => {
      console.log(state);
    });

    // Ready
    player.on("ready", (data) => {
      let { device_id } = data;
      console.log("Let the music play on!", this);
      this.setState({ deviceId: device_id });
    });
  }

  render() {
    return this.props.isLoading ? (
      <LoadingSpinner asOverlay />
    ) : (
      <div className="home-container">
        <Header loginedUser={this.props.loginedUser} />
        <div className="content-container">
          <LeftContent />
          <MainContent />
          <RightContent />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loginedUser: selectMyProfileLoginedUser,
  isLoading: selectMyProfileIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getMyProfile: () => dispatch(getMyProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

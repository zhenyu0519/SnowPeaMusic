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
      this.player = new window.Spotify.Player({
        name: "Jeffrey's Spotify Player",
        getOAuthToken: (cb) => {
          cb(token);
        },
      });
      this.createEventHandlers();

      // finally, connect!
      this.player.connect();
    }
  }

  createEventHandlers() {
    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    this.player.on('account_error', e => { console.error(e); });
    this.player.on('playback_error', e => { console.error(e); });
  
    // Playback status updates
    this.player.on('player_state_changed', state => { console.log(state); });
  
    // Ready
    this.player.on('ready', data => {
      let { device_id } = data;
      console.log("Let the music play on!");
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

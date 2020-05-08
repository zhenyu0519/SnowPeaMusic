import React, { Component } from "react";
// redux
import { connect } from "react-redux";
// util
import { clearTokens } from "../../utils/getAccessToken";
// actions
import { getMyProfile } from "../../redux/get-my-profile/myProfileActions";
// components
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import Header from "../../components/header/Header";

class HomePage extends Component {
  state = {
    myProfile: this.props.myProfile,
  };

  componentDidMount() {
    this.props.getMyProfile();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.myProfile.loginedUser !== state.myProfile.loginedUser) {
      return {
        myProfile: props.myProfile,
      };
    }
    return null;
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.myProfile === null) {
  //     this._loadAsyncData(this.props.id);
  //   }
  // }

  signOut = () => {
    clearTokens();
    window.location.reload();
  };

  render() {
    return this.props.myProfile.isLoading ? (
      <LoadingSpinner asOverlay />
    ) : (
      <div>
        <Header />
        <button onClick={this.signOut}>Sign out</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  myProfile: state.myProfile,
});

const mapDispatchToProps = (dispatch) => ({
  getMyProfile: () => dispatch(getMyProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

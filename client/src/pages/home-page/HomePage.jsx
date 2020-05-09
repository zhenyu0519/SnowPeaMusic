import React, { Component } from "react";
import "./HomePage.scss";
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

class HomePage extends Component {
  state = {
    myProfile: this.props.myProfile,
  };

  componentDidMount() {
    this.props.getMyProfile();
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.myProfile.loginedUser !== state.myProfile.loginedUser) {
  //     return {
  //       myProfile: props.myProfile,
  //     };
  //   }
  //   return null;
  // }

  // // componentDidUpdate(prevProps, prevState) {
  // //   if (this.state.myProfile === null) {
  // //     this._loadAsyncData(this.props.id);
  // //   }
  // // }

  render() {
    return this.props.myProfile.isLoading ? (
      <LoadingSpinner asOverlay />
    ) : (
      <div className="home-container">
        <Header />
        <div className="content-container">
          <LeftContent />
          <MainContent />
          <RightContent />
        </div>
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

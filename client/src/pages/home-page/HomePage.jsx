import React, { useEffect } from "react";
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

const HomePage = ({ getMyProfile, loginedUser, isLoading }) => {
  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  return isLoading ? (
    <LoadingSpinner asOverlay />
  ) : (
    <div className="home-container">
      <Header loginedUser={loginedUser} />
      <div className="content-container">
        <LeftContent />
        <MainContent />
        <RightContent />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loginedUser: selectMyProfileLoginedUser,
  isLoading: selectMyProfileIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getMyProfile: () => dispatch(getMyProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

import React, { useEffect } from "react";
import "./LoginPage.scss";
// import link from route
import { withRouter } from "react-router-dom";
// import util
import { getAccessToken } from "../../utils/getAccessToken";
import { ReactComponent as Logo } from "../../assets/login-icon.svg";

const LoginPage = ({ history }) => {
  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) history.push("/");
  }, [history]);

  return (
    <div className="login-button-container">
      <a href="http://localhost:8000/login" className="login-button">
        <Logo className="logo" />
        Login With Spotify
      </a>
    </div>
  );
};

export default withRouter(LoginPage);

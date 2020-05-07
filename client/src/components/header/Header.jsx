import React, { useEffect } from "react";
// import scss
import "./Header.scss";
// import link from route
import { Link, withRouter } from "react-router-dom";
// import logo
import { ReactComponent as Logo } from "../../assets/logo.svg";
// import util
import { getAccessToken } from "../../utils/getAccessToken";

const Header = ({ history }) => {
  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) history.push("/");
  }, [history]);
  return (
    <div className="header-container">
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options-container">
        <a href="http://localhost:8000/login">Login With Spotify</a>
      </div>
    </div>
  );
};

export default withRouter(Header);

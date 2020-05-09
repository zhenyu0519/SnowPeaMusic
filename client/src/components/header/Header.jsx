import React, { useEffect } from "react";
// import scss
import "./Header.scss";
// import link from route
import { Link, withRouter } from "react-router-dom";
// import logo
import { ReactComponent as Logo } from "../../assets/logo.svg";
// import util
import { getAccessToken, clearTokens } from "../../utils/getAccessToken";

const Header = ({ history }) => {
  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) history.push("/");
  }, [history]);

  const signOut = () => {
    clearTokens();
    window.location.reload();
  };
  
  return (
    <div className="header-container">
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options-container">
        <button onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
};

export default withRouter(Header);

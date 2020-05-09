import React, { useEffect } from "react";
// import scss
import "./Header.scss";
// import link from route
import { Link, withRouter } from "react-router-dom";
// import logo
import { ReactComponent as Logo } from "../../assets/logo.svg";
// import util
import { getAccessToken, clearTokens } from "../../utils/getAccessToken";
import { Avatar } from "../avatar/Avatar";
import { SearchBar } from "../search-bar/SearchBar";

const Header = ({ history, loginedUser }) => {
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
        <SearchBar displayName={loginedUser.display_name} />
        <Avatar
          imageUrl={loginedUser.images[0].url}
          alt={loginedUser.display_name}
        />
        <button onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
};

export default withRouter(Header);

import React from "react";
// import scss
import "./Header.scss";
// import link from route
import { Link } from "react-router-dom";
// import logo
import { ReactComponent as Logo } from "../../assets/logo.svg";

export const Header = () => {
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

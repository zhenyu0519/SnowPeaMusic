import React from "react";
import "./LoginPage.scss";
import { ReactComponent as Logo } from "../../assets/login-icon.svg";

const LoginPage = () => {
  const LOGIN_URI =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8000/login"
      : "https://snowpea.herokuapp.com/login";
  return (
    <div className="login-button-container">
      <a href={LOGIN_URI} className="login-button">
        <Logo className="logo" />
        Login With Spotify
        <p>Premium Member Only</p>
      </a>
    </div>
  );
};

export default LoginPage;

import React from "react";
import "./LoginPage.scss";
import { ReactComponent as Logo } from "../../assets/login-icon.svg";

const LoginPage = () => {
  return (
    <div className="login-button-container">
      <a href="http://localhost:8000/login" className="login-button">
        <Logo className="logo" />
        Login With Spotify
      </a>
    </div>
  );
};

export default LoginPage;

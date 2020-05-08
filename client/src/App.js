import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
// components
import Header from "./components/header/Header";
// pages
import HomePage from "./pages/home-page/HomePage";
import LoginPage from "./pages/login-page/LoginPage";
import { getAccessToken } from "./utils/getAccessToken";
const App = () => {
  return (
    <div className="App">
      {/* <Header /> */}
      <Switch>
        <Route
          exact
          path="/"
          render={() => (getAccessToken() ? <HomePage /> : <LoginPage />)}
        />
        <Route
          exact
          path="/login"
          render={() =>
            getAccessToken() ? <Redirect to="/" /> : <LoginPage />
          }
        />
      </Switch>
    </div>
  );
};

export default App;

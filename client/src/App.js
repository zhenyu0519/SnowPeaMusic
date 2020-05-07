import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
// components
import Header from "./components/header/Header";
// pages
import HomePage from "./pages/home-page/HomePage";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" />
      </Switch>
    </div>
  );
};

export default App;

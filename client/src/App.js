import React, { Suspense } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
// pages
// import HomePage from "./pages/home-page/HomePage";
// import LoginPage from "./pages/login-page/LoginPage";
// components
import { LoadingSpinner } from "./components/loading-spinner/LoadingSpinner";
// utils
import { getAccessToken } from "./utils/getAccessToken";
// react lazy to chunk up
const HomePage = React.lazy(() => import("./pages/home-page/HomePage"));
const LoginPage = React.lazy(() => import("./pages/login-page/LoginPage"));

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
      </Switch>
    </div>
  );
};

export default App;

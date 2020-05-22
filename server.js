// Express web server framework
const express = require("express");
// http request tools
const axios = require("axios");
// middlewares
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
// import utils
const generateRandomString = require("./utils/generateRandomString");

// config dotenv
require("dotenv").config();

// client credentials
const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = process.env.REDIRECT_URI; // Your redirect uri
const stateKey = process.env.STATE_KEY;

// create server
const app = express();

app.use(cors()).use(cookieParser());

// get login request
app.get("/login", function (req, res) {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  let scope =
    "streaming user-read-private user-read-email user-read-recently-played user-read-currently-playing user-read-playback-state user-modify-playback-state";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

// callback
app.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  // no state
  if (state === null || state !== storedState) {
    res.redirect(
      "http://localhost:3000/#" +
        querystring.stringify({ error: "state_mismatch" })
    );
  } else {
    res.clearCookie(stateKey);
    // your application requests authorization
    const params = {
      client_id,
      client_secret,
      redirect_uri,
      code,
      grant_type: "authorization_code",
    };
    axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        res.redirect(
          "http://localhost:3000/login/#" +
            querystring.stringify({ access_token, refresh_token })
        );
      })
      .catch((e) => {
        res.redirect(
          "http://localhost:3000/login/#" +
            querystring.stringify({ error: e.response.data })
        );
      });
  }
});

// refresh token
app.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const params = {
    client_id,
    client_secret,
    grant_type: "refresh_token",
    refresh_token: refresh_token,
  };
  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      access_token = response.data.access_token;
      res.send({
        access_token: access_token,
      });
    })
    .catch((e) => {
      console.error(e.response.data);
    });
});

console.log(`Server is Listening on ${process.env.PORT}`);
app.listen(process.env.PORT);
/* eslint consistent-return:0 import/order:0 */

const express = require("express");
const logger = require("./logger");
// for spotify auth
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const {
  client_id,
  client_secret
} = require("./../credentials/client_credentials");
const redirect_uri = "http://localhost:8000/callback";

// for graphql
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");

const argv = require("./argv");
const port = require("./port");
const isDev = process.env.NODE_ENV !== "production";
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require("ngrok")
    : false;
const { resolve } = require("path");

// generate cookie
const generateRandomString = function(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// init the cookie key
const stateKey = "spotify_auth_state";

// create a express app
const app = express();

// ----------- middle ware ----------
// serve static files such as images, CSS files, and JavaScript files
app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

// use graphql middle ware
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// ------------ routing ------------
/*The first call is the service ‘/authorize’ endpoint, passing to it the client ID, scopes, and redirect URI. 
This is the call that starts the process of authenticating to user and gets the user’s authorization to access data. */
app.get("/login", function(req, res) {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization, scope means permission from spotify, check document
  const scope = "user-read-private user-read-email user-read-playback-state";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

/*The second call is to the Spotify Accounts Service ‘/api/token’ endpoint, 
passing to it the authorization code returned by the first call and the client secret key. 
This call returns an access token and also a refresh token. */
app.get("/callback", function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect("/#" + querystring.stringify({ error: "state_mismatch" }));
  } else {
    res.clearCookie(stateKey);
    const params = {
      client_id,
      client_secret,
      redirect_uri,
      code,
      grant_type: "authorization_code"
    };
    axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(response => {
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        axios({
          method: "get",
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token }
        }).then(() => {
            res.redirect(
              "/#" + querystring.stringify({ access_token, refresh_token })
            );
          }).catch(e => {
            res.redirect(
              "/#" + querystring.stringify({ error: e.response.data })
            );
          });
      }).catch(e => console.error(e.response.data));
  }
});

/*The third call, in the code managing requests to ‘/refresh_token’, a refresh token is sent to ‘/api/token’. 
This will generate a new access token that we can issue when the previous has expired. */
app.get("/refresh_token", function(req, res) {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const params = {
    client_id,
    client_secret,
    grant_type: "refresh_token",
    refresh_token: refresh_token
  };
  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(response => {
      access_token = response.data.access_token;
      res.send({
        access_token: access_token
      });
    }).catch(e => {
      console.error(e.response.data);
    });
});

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || "localhost";

// use the gzipped bundle
app.get("*.js", (req, res, next) => {
  req.url = req.url + ".gz"; // eslint-disable-line
  res.set("Content-Encoding", "gzip");
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});

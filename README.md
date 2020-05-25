<a href="https://snowpea.herokuapp.com/"><img src="https://github.com/zhenyu0519/SnowPeaMusic/blob/master/client/public/logo-64x64.png" title="Snow Pea Music" alt="Snow Pea Music"></a>

# Snow Pea Music 

<a href="https://snowpea.herokuapp.com/"><img src="https://github.com/zhenyu0519/SnowPeaMusic/blob/master/client/public/demo.jpg" title="Snow Pea Music" alt="Snow Pea Music"></a>

---

![](https://img.shields.io/github/issues/zhenyu0519/SnowPeaMusic?color=red&style=flat-square)
![](https://img.shields.io/github/forks/zhenyu0519/SnowPeaMusic?color=green&style=flat-square)
![](https://img.shields.io/github/stars/zhenyu0519/SnowPeaMusic?color=yellow&style=flat-square)
![](https://img.shields.io/github/license/zhenyu0519/SnowPeaMusic?style=flat-square)
![](https://img.shields.io/github/repo-size/zhenyu0519/SnowPeaMusic?color=orange&style=flat-square)
![](https://img.shields.io/github/languages/top/zhenyu0519/SnowPeaMusic?color=blue&style=flat-square)


## Table of Contents 

  - [About](#about)
  - [Production](#production)
  - [Open Sourced](#open-sourced)
  - [Before Start](#before-start)
  - [Install](#install)
  - [Start](#start)
  - [Preview](#preview)
  - [License & Copyright](#license-&-copyright)

---

## About
 > Snow Pea is a mini music player based on the Spotify SDK and API. The player allow you to login with your Spotify account ( Premium membership required ) and play music under your recent played library. It also allow you to play editor's picks and new released albums. If these are not enough, you can always find your favourite tracks, albums and singers by searching with key words. All data are real and from Spotify Open APIs.

## Open Sourced
> The project is open sourced and it is not for commercial use! It won't charge anything. However, the Spotify premium account is required to ensure you have fully access of all functionilites.

## Before Start 
* Spotify premium membership required for SDK ( [sign up here](https://www.spotify.com/us/premium/) )
* Go to [dashboard page](https://developer.spotify.com/dashboard/login) register your app to get your unique client id and client secret.
* Set up your redirect urls by click edit setting in your dashboard page. You can create multiple redirect urls. One has to be your local server url + /callback others can be production server url + /callback.
* Have knowledge about Reactjs (hooks + class), React-Redux, Redux-Thunk, Axios, how Nodejs, and NPM
* Read Spotify API and SDK dowcuments.

## Install
  Install backend dependences, navigate to **root** folder then
  ```
  npm install
  ```
  Install frontend dependences, navigate to **client** folder then
  ```
  npm install
  ```
  Create .env file under root folder, copy paste the content below and replace client id and secret with your own, save.
  ```
  PORT=8000
  CLIENT_ID="REPLACE_YOUR_CLIENT_ID_HERE"
  CLIENT_SECRET="REPLACE_YOUR_CLIENT_SECRET_HERE"
  STATE_KEY="spotify_auth_state"  
  ```
  **Do not explore your client id and client secred!!!**

## Start
  To run on local server, navigate to root directory
  ```
  npm run dev
  ```

## Preview
![demo](https://github.com/zhenyu0519/SnowPeaMusic/blob/master/client/public/demo.gif)

---

## Production
> The website has already deploied on Heroku. Due the free server ( Dyno ), there are some constrains such as the server will put the website if it dose not receive any traffic in 1 hour. So when you access the web, you might need to wait about 15 ~ 20 seconds to wake it up.

---
## License & Copyright

![](https://img.shields.io/github/license/zhenyu0519/SnowPeaMusic?style=flat-square)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © <a href="https://github.com/zhenyu0519/SnowPeaMusic" target="_blank">Jeffrey Zhang</a>.
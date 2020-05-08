import axios from "axios";
import { getAccessToken } from "../utils/getAccessToken";

const accessToken = getAccessToken();
const sendRequest = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: { Authorization: `Bearer ${accessToken}` },
});

export default sendRequest;

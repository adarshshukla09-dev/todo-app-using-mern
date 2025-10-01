// client/src/api.js
import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;

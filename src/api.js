import axios from "axios";

const api = axios.create({
  baseURL: "https://kcommerce.duckdns.org",
  // baseURL: "http://127.0.0.1:5000",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

console.log("API BASE URL =", api.defaults.baseURL);

export default api;
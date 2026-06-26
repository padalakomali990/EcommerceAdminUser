import axios from "axios";

const api = axios.create({
  baseURL: "https://kcommerce.duckdns.org",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

console.log("API BASE URL =", api.defaults.baseURL);

export default api;
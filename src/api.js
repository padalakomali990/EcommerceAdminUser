// src/api.js

import axios from "axios";

const api = axios.create({
  baseURL: "https://kcommerce.duckdns.org/",
});

export default api;
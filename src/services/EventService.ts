import axios from "axios";

// Single Axios instance for out app
const apiClient = axios.create({
  // Base URL for all calls to use
  baseURL: "https://my-json-server.typicode.com/XHJeon/portfolio",
  // Authentication
  withCredentials: false,
  // Configuration
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getEvents() {
    return apiClient.get("/events");
  },
};

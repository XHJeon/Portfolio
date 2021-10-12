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
  // Events to return per page and the page we're on
  getEvents(eventsPerPage: number, currentPage: number) {
    return apiClient.get(
      `/events?_limit=${eventsPerPage}&_page=${currentPage}`
    );
  },
  getEvent(id: number) {
    return apiClient.get(`/events/${id}`);
  },
};

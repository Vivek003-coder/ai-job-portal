import axios from "axios";

/**
 * Central Axios instance for the AI Job Portal.
 *
 * All frontend API requests should use this instance.
 */
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

/**
 * Automatically attach JWT token to protected API requests.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Handle common authentication errors.
 */
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export default api;
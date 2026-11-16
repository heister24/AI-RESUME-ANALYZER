import axios from "axios";

export const getBackendUrl = () => {
  let url = (import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api")
    .trim()
    .replace(/\/+$/, "");
  if (url.endsWith("//api")) {
    url = url.slice(0, -5) + "/api";
  } else if (!url.endsWith("/api")) {
    url = `${url}/api`;
  }
  return url;
};

const api = axios.create({
  baseURL: getBackendUrl(),
  withCredentials: true,
});

// Automatically attach Bearer token to all requests for reliable cross-domain authentication
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // Ignore in non-browser environments
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;

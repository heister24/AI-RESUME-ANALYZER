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

export default api;

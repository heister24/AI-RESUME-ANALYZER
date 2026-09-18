import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

const register = async (username, email, password) => {
  try {
    const res = await api.post("/auth/register", { username, email, password });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const login = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getMe = async () => {
  try {
    const res = await api.get("/auth/getme");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  const res = await api.get("/auth/logout");

  return res.data;
};

const updateProfile = async (profileData) => {
  const res = await api.post("/auth/update-profile", profileData);
  return res.data;
};

export { register, login, getMe, logout, updateProfile };

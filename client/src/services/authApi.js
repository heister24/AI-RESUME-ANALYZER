import api from "./apiClient.js";

const register = async (name, username, phoneNo, email, password) => {
  const res = await api.post("/auth/register", {
    name,
    username,
    email,
    phoneNo,
    password,
  });
  if (res.data?.token) {
    try {
      localStorage.setItem("token", res.data.token);
    } catch (e) {}
  }
  return res.data;
};

const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  if (res.data?.token) {
    try {
      localStorage.setItem("token", res.data.token);
    } catch (e) {}
  }
  return res.data;
};

const getMe = async () => {
  try {
    const res = await api.get("/auth/getme");
    return res.data;
  } catch (error) {
    // If 401 or invalid token, clean up stored token
    if (error?.response?.status === 401) {
      try {
        localStorage.removeItem("token");
      } catch (e) {}
    }
    return null;
  }
};

const logout = async () => {
  try {
    localStorage.removeItem("token");
  } catch (e) {}
  const res = await api.get("/auth/logout");
  return res.data;
};

const updateProfile = async (profileData) => {
  const res = await api.post("/auth/update-profile", profileData);
  return res.data;
};

export { register, login, getMe, logout, updateProfile };

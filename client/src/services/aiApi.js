import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

const generateReport = async (formData) => {
  try {
    const res = await api.post("/interview/generate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Report generation failed:", error);
    throw error;
  }
};

export { generateReport };

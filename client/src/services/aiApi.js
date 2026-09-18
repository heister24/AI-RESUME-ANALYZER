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

const fetchUserReports = async () => {
  try {
    const res = await api.get("/interview/reports");
    return res.data;
  } catch (error) {
    console.error("Fetching user reports failed:", error);
    throw error;
  }
};

const fetchReportById = async (id) => {
  try {
    const res = await api.get(`/interview/report/${id}`);
    return res.data;
  } catch (error) {
    console.error("Fetching report failed:", error);
    throw error;
  }
};

const deleteReportById = async (id) => {
  try {
    const res = await api.delete(`/interview/report/${id}`);
    return res.data;
  } catch (error) {
    console.error("Deleting report failed:", error);
    throw error;
  }
};

export { generateReport, fetchUserReports, fetchReportById, deleteReportById };

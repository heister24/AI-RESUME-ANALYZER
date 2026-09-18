import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
import {
  generateReport,
  getUserReports,
  getReportById,
  deleteReport,
} from "../controllers/interviewController.js";

const interviewRouter = express.Router();

interviewRouter.post(
  "/generate",
  authMiddleware,
  upload.single("resume"),
  generateReport,
);

interviewRouter.get("/reports", authMiddleware, getUserReports);
interviewRouter.get("/report/:id", authMiddleware, getReportById);
interviewRouter.delete("/report/:id", authMiddleware, deleteReport);

export default interviewRouter;

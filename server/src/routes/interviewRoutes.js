import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
import {
  generateReport,
  getUserReports,
  getReportById,
  deleteReport,
  handleRewriteBullet,
  handleGenerateCoverLetter,
} from "../controllers/interviewController.js";
import {
  aiReportLimiter,
  bulletRewriteLimiter,
} from "../middlewares/rateLimitMiddleware.js";

const interviewRouter = express.Router();

interviewRouter.post(
  "/generate",
  authMiddleware,
  aiReportLimiter,
  upload.single("resume"),
  generateReport,
);

interviewRouter.post(
  "/rewrite-bullet",
  authMiddleware,
  bulletRewriteLimiter,
  handleRewriteBullet,
);

interviewRouter.post(
  "/generate-cover-letter",
  authMiddleware,
  bulletRewriteLimiter,
  handleGenerateCoverLetter,
);

interviewRouter.get("/reports", authMiddleware, getUserReports);
interviewRouter.get("/report/:id", authMiddleware, getReportById);
interviewRouter.delete("/report/:id", authMiddleware, deleteReport);

export default interviewRouter;

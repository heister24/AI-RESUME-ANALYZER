import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
import { generateReport } from "../controllers/interviewController.js";

const interviewRouter = express.Router();

interviewRouter.post(
  "/generate",
  authMiddleware,
  upload.single("resume"),
  generateReport,
);

export default interviewRouter;

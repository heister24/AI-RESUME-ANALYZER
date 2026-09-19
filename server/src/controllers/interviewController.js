import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import InterviewReportModel from "../models/interviewReport.model.js";
import UserModel from "../models/user.model.js";

const generateReport = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.tokens < 1) {
      return res.status(403).json({
        success: false,
        message: "Not enough tokens to generate report. Please purchase more.",
      });
    }

    const resumeContent = await new PDFParse(
      Uint8Array.from(req.file.buffer),
    ).getText();
    const { selfDescription, jobDescription } = req.body;

    const interViewReportByAI = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await InterviewReportModel.create({
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interViewReportByAI,
    });

    user.tokens -= 1;
    await user.save();

    res.status(200).json({
      message: "Interview report generated successfully",
      interviewReport,
      tokens: user.tokens,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getUserReports = async (req, res) => {
  try {
    const reports = await InterviewReportModel.find({ user: req.user.id }).sort(
      { createdAt: -1 },
    );

    return res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    // console.log("Error fetching user reports:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
    });
  }
};

const getReportById = async (req, res) => {
  try {
    const report = await InterviewReportModel.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    return res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    // console.log("Error fetching report:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch report",
    });
  }
};

const deleteReport = async (req, res) => {
  try {
    const report = await InterviewReportModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found or not authorized to delete",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    // console.log("Error deleting report:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete report",
    });
  }
};

export { generateReport, getUserReports, getReportById, deleteReport };

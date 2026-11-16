import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import generateInterviewReport, {
  rewriteResumeBullet,
  generateCoverLetter,
} from "../services/ai.service.js";
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

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume document (.pdf or .docx).",
      });
    }

    // Extract text dynamically based on document format
    let resumeText = "";
    const mimeType = req.file.mimetype || "";
    const fileName = (req.file.originalname || "").toLowerCase();

    if (mimeType === "application/pdf" || fileName.endsWith(".pdf")) {
      const pdfData = await new PDFParse(
        Uint8Array.from(req.file.buffer),
      ).getText();
      resumeText = pdfData.text || "";
    } else if (
      mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimeType === "application/msword" ||
      fileName.endsWith(".docx")
    ) {
      const docxData = await mammoth.extractRawText({
        buffer: req.file.buffer,
      });
      resumeText = docxData.value || "";
    } else {
      return res.status(400).json({
        success: false,
        message:
          "Unsupported document format. Please upload a PDF (.pdf) or Word document (.docx).",
      });
    }

    if (!resumeText.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Unable to extract readable text from the document. Please ensure the document is not password-protected or empty.",
      });
    }

    const { selfDescription, jobDescription } = req.body;

    const interViewReportByAI = await generateInterviewReport({
      resume: resumeText,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await InterviewReportModel.create({
      user: req.user.id,
      resume: resumeText,
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
    console.error("generateReport error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error during analysis.",
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

const handleRewriteBullet = async (req, res) => {
  try {
    const { rawBullet, targetRole } = req.body;
    if (!rawBullet || typeof rawBullet !== "string" || rawBullet.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid resume bullet point to optimize (at least 5 characters).",
      });
    }

    const optimization = await rewriteResumeBullet({
      rawBullet: rawBullet.trim(),
      targetRole: targetRole ? targetRole.trim() : "",
    });

    return res.status(200).json({
      success: true,
      optimization,
    });
  } catch (error) {
    console.error("handleRewriteBullet error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to optimize bullet point. Please try again.",
    });
  }
};

const handleGenerateCoverLetter = async (req, res) => {
  try {
    const { reportId, companyName } = req.body;
    let resumeText = req.body.resume;
    let jobDescriptionText = req.body.jobDescription;

    if (reportId) {
      const report = await InterviewReportModel.findOne({
        _id: reportId,
        user: req.user.id,
      });
      if (report) {
        resumeText = report.resume || resumeText;
        jobDescriptionText = report.jobDescription || jobDescriptionText;
      }
    }

    if (!jobDescriptionText) {
      return res.status(400).json({
        success: false,
        message: "Job description is required to generate a tailored cover letter.",
      });
    }

    const user = await UserModel.findById(req.user.id);
    const candidateName = user?.name || user?.username || "Candidate";

    const coverLetter = await generateCoverLetter({
      resume: (resumeText || "").slice(0, 3000),
      jobDescription: (jobDescriptionText || "").slice(0, 3000),
      candidateName,
      companyName: companyName ? companyName.trim() : "Hiring Team",
    });

    return res.status(200).json({
      success: true,
      coverLetter,
    });
  } catch (error) {
    console.error("handleGenerateCoverLetter error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate tailored cover letter. Please try again.",
    });
  }
};

export {
  generateReport,
  getUserReports,
  getReportById,
  deleteReport,
  handleRewriteBullet,
  handleGenerateCoverLetter,
};

import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import InterviewReportModel from "../models/interviewReport.model.js";

const generateReport = async (req, res) => {
  try {
    const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText();
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

    res.status(200).json({
      message: "Interview report generated successfully",
      interviewReport,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { generateReport };

import mongoose from "mongoose";

const technicalQuestionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    intention: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const behaviouralQuestionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    intention: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new mongoose.Schema(
  {
    skills: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
  },
  { _id: false },
);

const prepairationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
    },
    focus: {
      type: String,
      required: true,
    },
    tasks: [{ type: String, required: true }],
  },
  {
    _id: false,
  },
);

const categoryHeatmapSchema = new mongoose.Schema(
  {
    score: { type: Number, default: 0 },
    matched: [{ type: String }],
    missing: [{ type: String }],
  },
  { _id: false },
);

const skillsHeatmapSchema = new mongoose.Schema(
  {
    hardSkills: categoryHeatmapSchema,
    cloudAndDevOps: categoryHeatmapSchema,
    methodologies: categoryHeatmapSchema,
    softSkills: categoryHeatmapSchema,
  },
  { _id: false },
);

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is required."],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionsSchema],
    behaviouralQuestions: [behaviouralQuestionsSchema],
    skillGaps: [skillGapSchema],
    skillsHeatmap: skillsHeatmapSchema,
    prepairationPlan: [prepairationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  {
    timestamps: true,
  },
);

const InterviewReportModel = mongoose.model(
  "InterviewReportModel",
  interviewReportSchema,
);
export default InterviewReportModel;

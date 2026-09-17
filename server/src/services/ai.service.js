import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing from the server environment.");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const model_name = "gemini-3.5-flash-lite";

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 to 100 indicating how well the candidate profile matches.",
    ),
  technicalQuestions: z.array(
    z.object({
      question: z
        .string()
        .describe("The technical question that can be asked in the interview."),

      intention: z
        .string()
        .describe(
          "The intention of the interviewer behind asking the question.",
        ),

      answer: z
        .string()
        .describe(
          "How to answer this question, what points to cover, what approach to take etc.",
        ),
    }),
  ),

  behaviouralQuestions: z.array(
    z.object({
      question: z
        .string()
        .describe(
          "The behavioural question that can be asked in the interview.",
        ),

      intention: z
        .string()
        .describe(
          "The intention of the interviewer behind asking the question.",
        ),

      answer: z
        .string()
        .describe(
          "How to answer this question, what points to cover, what approach to take etc.",
        ),
    }),
  ),

  skillGaps: z.array(
    z.object({
      skills: z.string().describe("The skill which candidate is lacking."),

      severity: z
        .enum(["low", "medium", "high"])
        .describe("The severity of the skill gap."),
    }),
  ),

  prepairationPlan: z.array(
    z.object({
      day: z.number().describe("The day number of the preparation plan."),

      focus: z.string().describe("The main focus for this day."),

      tasks: z.array(z.string()).describe("The tasks to complete on this day."),
    }),
  ),
});

const generateInterviewReport = async (
  { resume, selfDescription, jobDescription },
) => {
  const prompt = `Generate an interview report for a candidate with the following details:
    Resume : ${resume}
    Self Description : ${selfDescription}
    Job Description : ${jobDescription}`;
  const response = await ai.models.generateContent({
    model: model_name,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: z.toJSONSchema(interviewReportSchema),
    },
  });

  return interviewReportSchema.parse(JSON.parse(response.text));
};

export default generateInterviewReport;

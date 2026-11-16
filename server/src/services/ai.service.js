import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing from the server environment.");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const candidateModels = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
];

const generateWithFallback = async ({ prompt, schema }) => {
  let lastError;
  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseJsonSchema: z.toJSONSchema(schema),
        },
      });
      if (response && response.text) {
        return schema.parse(JSON.parse(response.text));
      }
    } catch (err) {
      console.warn(
        `[AI Service] Model ${model} failed, falling back:`,
        err.message,
      );
      lastError = err;
    }
  }
  throw lastError;
};

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

  skillsHeatmap: z
    .object({
      hardSkills: z.object({
        score: z
          .number()
          .describe(
            "0-100 match percentage for core languages, frameworks, and programming tools.",
          ),
        matched: z
          .array(z.string())
          .describe("Key hard skills matched between resume and JD."),
        missing: z
          .array(z.string())
          .describe("Required hard skills missing from candidate background."),
      }),
      cloudAndDevOps: z.object({
        score: z
          .number()
          .describe(
            "0-100 match percentage for cloud (AWS/GCP/Azure), containerization, CI/CD, and infra.",
          ),
        matched: z.array(z.string()),
        missing: z.array(z.string()),
      }),
      methodologies: z.object({
        score: z
          .number()
          .describe(
            "0-100 match percentage for system architecture, microservices, TDD, Agile sprints.",
          ),
        matched: z.array(z.string()),
        missing: z.array(z.string()),
      }),
      softSkills: z.object({
        score: z
          .number()
          .describe(
            "0-100 match percentage for ownership, cross-functional collaboration, mentorship, leadership.",
          ),
        matched: z.array(z.string()),
        missing: z.array(z.string()),
      }),
    })
    .optional()
    .describe("Taxonomy heatmap breaking down matched vs missing competencies into 4 core buckets."),

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
  const prompt = `Generate a rigorous, surgical interview preparation and ATS diagnostic report for a candidate:
    Resume Content : ${resume}
    Self Description / Notes : ${selfDescription || "None provided"}
    Target Job Description : ${jobDescription}

    Requirements:
    1. Calibrate overall match score (0-100).
    2. Identify specific technical and behavioral questions with interviewer intentions and model answers.
    3. Audit missing competencies (skillGaps) with priority severity (low, medium, high).
    4. Categorize skills into a 4-dimensional skillsHeatmap (hardSkills, cloudAndDevOps, methodologies, softSkills) with category percentage scores (0-100) and matched vs missing skill lists.
    5. Construct a structured 7-day preparation roadmap plan.`;

  return await generateWithFallback({
    prompt,
    schema: interviewReportSchema,
  });
};

const bulletRewriteSchema = z.object({
  originalBullet: z.string().describe("The user's original unoptimized bullet point."),
  critique: z
    .string()
    .describe(
      "1-2 concise sentences diagnosing why the original bullet lacked impact or ATS strength.",
    ),
  variations: z.array(
    z.object({
      type: z
        .enum([
          "Impact & Metric Focused",
          "Leadership & Architecture",
          "ATS Keyword Maximizer",
        ])
        .describe("The optimization style category."),
      rewrittenBullet: z
        .string()
        .describe(
          "The polished bullet point following Google's XYZ formula: Accomplished [X] as measured by [Y], by doing [Z].",
        ),
      highlightedMetric: z
        .string()
        .describe("The specific metric, scale, or business outcome introduced."),
    }),
  ),
});

export const rewriteResumeBullet = async ({ rawBullet, targetRole }) => {
  const prompt = `You are a Principal Executive Recruiter and Resume Strategist at Google/Stripe.
Your task is to rewrite the candidate's raw, unoptimized resume bullet point into 3 distinct, high-impact bullet points following Google's XYZ formula:
"Accomplished [X] as measured by [Y], by doing [Z]".

Target Role Context: ${targetRole || "Software / Tech Professional"}
Candidate's Raw Bullet Point: "${rawBullet}"

Requirements:
1. Provide a sharp, constructive 1-2 sentence critique explaining what was missing (e.g. passive verbs, missing metrics, lack of scale).
2. Generate exactly 3 variations:
   - "Impact & Metric Focused": Emphasize quantifiable performance, % latency reduction, revenue, or user scale.
   - "Leadership & Architecture": Emphasize ownership, system design, cross-functional mentoring, or technical specification.
   - "ATS Keyword Maximizer": Emphasize industry standard tools, frameworks, CI/CD, testing, or enterprise architecture keywords.
3. Every bullet must start with an active, powerful past-tense action verb (e.g., "Architected", "Engineered", "Spearheaded", "Revamped").`;

  return await generateWithFallback({
    prompt,
    schema: bulletRewriteSchema,
  });
};

const coverLetterSchema = z.object({
  targetRole: z.string().describe("Target role title."),
  companyName: z.string().describe("Target hiring company name."),
  subjectLine: z.string().describe("Professional email/letter subject line."),
  salutation: z
    .string()
    .describe("E.g. Dear Hiring Team / Dear [Company] Leadership,"),
  openingHook: z
    .string()
    .describe(
      "Engaging 2-3 sentence introduction stating the position and why the candidate is drawn to the team.",
    ),
  bodyParagraph1: z
    .string()
    .describe(
      "Highlights 2 major quantifiable accomplishments from candidate background relevant to role.",
    ),
  bodyParagraph2: z
    .string()
    .describe(
      "Connects candidate technical approach and toolset to the company requirements.",
    ),
  conclusionAndCallToAction: z
    .string()
    .describe("Confident closing expressing desire for an interview discussion."),
  signOff: z
    .string()
    .describe("Professional closing e.g. Sincerely,\n[Candidate Name]"),
  fullLetter: z
    .string()
    .describe("Complete formatted cover letter ready to copy."),
});

export const generateCoverLetter = async ({
  resume,
  jobDescription,
  candidateName = "Candidate",
  companyName = "Hiring Team",
}) => {
  const prompt = `You are a Principal Career Advisor and Tech Recruiter.
Write a targeted, highly persuasive, non-generic cover letter for this candidate:
Candidate Name: ${candidateName}
Target Company: ${companyName}
Target Job Description: ${jobDescription}
Candidate Resume Summary: ${resume}

Guidelines:
1. Avoid cliché openers like "I am writing to express my interest". Use a bold, value-first hook.
2. Quantify achievements (metrics, latency, revenue, team scale) pulled from candidate background.
3. Bridge candidate skill competencies directly to the company key requirements.
4. Keep the tone executive, confident, and authentic.`;

  return await generateWithFallback({
    prompt,
    schema: coverLetterSchema,
  });
};

export { generateInterviewReport };
export default generateInterviewReport;

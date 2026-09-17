import { useLocation, Navigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Code2,
  Users,
  AlertTriangle,
  CalendarDays,
  ChevronRight,
  Target,
} from "lucide-react";
import { useState } from "react";

const Report = () => {
  const location = useLocation();
  const rawData = location.state?.reportData;

  // If no data was passed (e.g. user navigated directly), redirect back to setup
  if (!rawData) {
    return <Navigate to="/interview" replace />;
  }

  // Extract the interview report from the API response
  const report = rawData.interviewReport || rawData;

  const score = report.matchScore || 0;
  const skillGaps = report.skillGaps || [];
  const prepPlan = report.prepairationPlan || [];
  const techQuestions = report.technicalQuestions || [];
  const behaviorQuestions = report.behaviouralQuestions || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:py-14">
        {/* Navigation & Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            to="/interview"
            className="group mb-6 inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-emerald-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Analysis Setup
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-800">
                <Award className="h-4 w-4" />
                <span>Analysis Complete</span>
              </div>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Your Resume{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  Report
                </span>
              </h1>
            </div>

            {/* Score Badge */}
            <div className="flex shrink-0 items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-200/60">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-500">
                  Overall Match
                </span>
                <span className="text-sm text-gray-400">
                  Based on job description
                </span>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border-[4px] border-emerald-500">
                <span className="text-xl font-bold text-emerald-700">
                  {score}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid Layout for Main Content */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Skill Gaps & Prep Plan */}
          <div className="lg:col-span-5 space-y-8">
            {/* Skill Gaps */}
            {skillGaps.length > 0 && (
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-3xl border border-gray-200/60 bg-white p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Skill Gaps Identified
                  </h2>
                </div>
                <div className="space-y-4">
                  {skillGaps.map((gap, idx) => {
                    const title = gap.skill || gap.skills || gap.topic || gap.gap || `Gap ${idx + 1}`;
                    const severity = gap.severity;
                    const description = gap.description || gap.reason;
                    
                    return (
                      <div
                        key={idx}
                        className="flex items-start justify-between rounded-2xl bg-gray-50 p-5 border border-gray-100 transition-colors hover:border-gray-200"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {Array.isArray(title) ? title.join(', ') : title}
                          </h3>
                          {description && (
                            <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                              {description}
                            </p>
                          )}
                        </div>
                        {severity && (
                          <span className={`ml-4 inline-flex shrink-0 items-center rounded-md px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${
                            severity.toLowerCase() === 'high' ? 'bg-red-50 text-red-700 ring-red-600/20' :
                            severity.toLowerCase() === 'medium' ? 'bg-amber-50 text-amber-700 ring-amber-600/20' :
                            'bg-green-50 text-green-700 ring-green-600/20'
                          }`}>
                            {severity} Priority
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.section>
            )}

            {/* Preparation Plan */}
            {prepPlan.length > 0 && (
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-3xl border border-gray-200/60 bg-white p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Preparation Plan
                  </h2>
                </div>
                <div className="relative border-l-2 border-gray-100 ml-4 space-y-8 pb-4">
                  {prepPlan.map((plan, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-white bg-blue-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        Day {plan.day || idx + 1}
                      </span>
                      <h3 className="mt-1 font-bold text-gray-900 text-lg">
                        {plan.focus}
                      </h3>
                      {plan.tasks && plan.tasks.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {plan.tasks.map((task, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <Target className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Right Column: Questions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Technical Questions */}
            {techQuestions.length > 0 && (
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 shadow-sm">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Technical Questions
                  </h2>
                </div>
                <div className="grid gap-5">
                  {techQuestions.map((q, idx) => (
                    <QuestionCard
                      key={idx}
                      question={q}
                      idx={idx}
                      color="purple"
                    />
                  ))}
                </div>
              </motion.section>
            )}

            {/* Behavioural Questions */}
            {behaviorQuestions.length > 0 && (
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 shadow-sm">
                    <Users className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Behavioral Questions
                  </h2>
                </div>
                <div className="grid gap-5">
                  {behaviorQuestions.map((q, idx) => (
                    <QuestionCard
                      key={idx}
                      question={q}
                      idx={idx}
                      color="teal"
                    />
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Reusable component for questions
const QuestionCard = ({ question, idx, color }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colorMap = {
    purple:
      "hover:border-purple-200 group-hover:bg-purple-400 bg-purple-50 text-purple-600",
    teal: "hover:border-teal-200 group-hover:bg-teal-400 bg-teal-50 text-teal-600",
  };

  const bgHover =
    color === "purple" ? "hover:border-purple-200" : "hover:border-teal-200";
  const lineHover =
    color === "purple"
      ? "group-hover:bg-purple-400"
      : "group-hover:bg-teal-400";
  const badgeColors =
    color === "purple"
      ? "bg-purple-50 text-purple-700"
      : "bg-teal-50 text-teal-700";

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-sm transition-all ${bgHover} cursor-pointer`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`absolute left-0 top-0 h-full w-1 bg-gray-200 transition-colors ${lineHover}`}
      />

      <div className="p-6 sm:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div
              className={`mb-3 inline-flex items-center rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wider ${badgeColors}`}
            >
              Question {idx + 1}
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">
              {question.question}
            </h3>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed border-l-2 border-gray-200 pl-3">
              <span className="font-semibold text-gray-700">Intention:</span>{" "}
              {question.intention}
            </p>
          </div>
          <div
            className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>

        {/* Expandable Answer Section */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div className="mt-5 rounded-xl bg-gray-50 p-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-gray-500" />
              <span className="font-semibold text-gray-700 text-sm">
                Suggested Answer Strategy
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {question.answer}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Report;

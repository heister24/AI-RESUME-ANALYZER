import { useState, useRef, useContext } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle,
  Briefcase,
  User,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateReport } from "../services/aiApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const suggestions = [
  "Frontend Engineer at Google",
  "Product Designer",
  "MERN Stack Developer",
];

const InterviewBriefForm = () => {
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selfDescription.trim() || !jobDescription.trim() || !resumeFile) {
      setSubmitError(
        "Please upload your resume and fill in both descriptions.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("selfDescription", selfDescription);
      formData.append("jobDescription", jobDescription);

      const result = await generateReport(formData);
      console.log("Report generated successfully:", result);
      
      // Update local token count
      if (user && result.tokens !== undefined) {
        setUser({ ...user, tokens: result.tokens });
      }

      // Navigate to report page, passing the result via state
      navigate("/report", { state: { reportData: result } });
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError(
        error?.response?.data?.message ||
          "Unable to generate the report right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const chooseSuggestion = (suggestion) => {
    setJobDescription((current) =>
      current ? `${current}\n${suggestion}` : suggestion,
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/60 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-xl sm:p-10"
    >
      {/* Decorative gradient blob */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-linear-to-br from-emerald-200/40 to-teal-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-linear-to-tr from-green-200/30 to-emerald-50/30 blur-3xl" />

      <div className="relative z-10 border-b border-gray-200/60 pb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-700">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Resume Analysis</span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Analyze Your{" "}
          <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Resume
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">
          Upload your resume and provide the job description. We'll generate a
          comprehensive report to help you ace the interview.
        </p>
      </div>

      <form className="relative z-10 mt-10 space-y-10" onSubmit={handleSubmit}>
        {/* Resume Upload Section */}
        <section>
          <div className="mb-4 flex items-center gap-2 text-gray-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <FileText className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-semibold">Resume & Portfolio</h2>
          </div>

          <div
            className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-all duration-300 ${
              isDragging
                ? "border-emerald-500 bg-emerald-50 shadow-inner"
                : resumeFile
                  ? "border-emerald-200 bg-white"
                  : "border-gray-200 bg-gray-50/50 hover:border-emerald-300 hover:bg-emerald-50/30"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />

            <AnimatePresence mode="wait">
              {resumeFile ? (
                <motion.div
                  key="uploaded"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    {resumeFile.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {(resumeFile.size / 1024 / 1024).toFixed(2)} MB • Click to
                    replace
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm ring-1 ring-gray-200/50">
                    <UploadCloud className="h-6 w-6" />
                  </div>
                  <p className="text-base font-medium text-gray-700">
                    Drag and drop your resume here
                  </p>
                  <p className="mt-1.5 text-sm text-gray-500">
                    Or click to browse (PDF, DOCX)
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Job Description Section */}
        <section>
          <div className="mb-4 flex items-center gap-2 text-gray-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Briefcase className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-semibold">Job Description</h2>
          </div>
          <p className="mb-3 text-sm text-gray-500">
            Paste the job description or describe the role you are targeting.
          </p>
          <div className="relative group">
            <textarea
              className="w-full resize-none rounded-xl border border-gray-200 bg-white/80 p-4 text-gray-700 shadow-sm transition-all focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/20 group-hover:border-blue-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
              rows={5}
              placeholder="E.g., We are looking for a Senior Frontend Developer with 5+ years of experience in React..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-gray-400">
              Quick start:
            </span>
            {suggestions.map((suggestion) => (
              <button
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                type="button"
                key={suggestion}
                onClick={() => chooseSuggestion(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </section>

        {/* Self Description Section */}
        <section>
          <div className="mb-4 flex items-center gap-2 text-gray-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              <User className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-semibold">About You</h2>
          </div>
          <p className="mb-3 text-sm text-gray-500">
            Highlight your key strengths, background, and goals.
          </p>
          <div className="relative group">
            <textarea
              className="w-full resize-none rounded-xl border border-gray-200 bg-white/80 p-4 text-gray-700 shadow-sm transition-all focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-400/20 group-hover:border-purple-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
              rows={4}
              placeholder="I am a passionate software engineer focused on building scalable web applications..."
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
            />
          </div>
        </section>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-200/60 pt-8 sm:flex-row">
          <div className="flex flex-col items-start sm:items-center">
            <p className="text-sm text-gray-500">
              Your details are safe and won't be shared.
            </p>
            {submitError && (
              <p className="mt-2 text-sm font-medium text-red-600">
                {submitError}
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="group flex items-center justify-center rounded-xl bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-gray-900/20 focus:outline-none focus:ring-4 focus:ring-gray-900/30 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto w-full"
            type="submit"
            disabled={
              isSubmitting ||
              !selfDescription.trim() ||
              !jobDescription.trim() ||
              !resumeFile
            }
          >
            <span>{isSubmitting ? "Generating..." : "Generate Report"}</span>
            {!isSubmitting && (
              <motion.span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </motion.span>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default InterviewBriefForm;

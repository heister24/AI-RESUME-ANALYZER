import { useState, useRef, useContext } from "react";
import { UploadCloud, FileText, X, Loader2, AlertCircle, ArrowRight, Wallet } from "lucide-react";
import { generateReport } from "../services/aiApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import DiagnosticProgressModal from "./DiagnosticProgressModal";

const InterviewBriefForm = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setSubmitError("Please upload your resume (PDF or DOCX).");
      return;
    }

    const fileExt = (resumeFile.name || "").toLowerCase();
    if (
      !fileExt.endsWith(".pdf") &&
      !fileExt.endsWith(".docx") &&
      !fileExt.endsWith(".doc")
    ) {
      setSubmitError(
        "Unsupported file format. Please upload a PDF (.pdf) or Word (.docx) document.",
      );
      return;
    }

    if (resumeFile.size > 5 * 1024 * 1024) {
      setSubmitError(
        "Document exceeds the 5MB file size limit. Please upload a smaller resume.",
      );
      return;
    }

    if (!jobDescription.trim()) {
      setSubmitError("Please provide the target job description.");
      return;
    }
    if (!selfDescription.trim()) {
      setSubmitError("Please provide a brief summary of your background.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription.trim());
      formData.append("selfDescription", selfDescription.trim());

      const result = await generateReport(formData);

      if (user && result.tokens !== undefined) {
        setUser({ ...user, tokens: result.tokens });
      }

      navigate("/report", { state: { reportData: result } });
    } catch (error) {
      setSubmitError(
        error?.response?.data?.message ||
          "Unable to analyze resume right now. Please try again.",
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
      setSubmitError("");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setSubmitError("");
    }
  };

  const loadSample = async () => {
    try {
      const response = await fetch("/sample_resume.pdf");
      const blob = await response.blob();
      const file = new File([blob], "sample_resume.pdf", {
        type: "application/pdf",
      });
      setResumeFile(file);
      setJobDescription(
        "Senior Frontend Engineer with 5+ years of experience in React, TypeScript, and modern web architecture. Responsible for delivering responsive interfaces, component libraries, and performance optimization.",
      );
      setSelfDescription(
        "Frontend Engineer with 5 years of experience building scalable web applications with React, TypeScript, and Next.js. Focused on performance and clean UX.",
      );
      setSubmitError("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      {/* Title & Introduction */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#18203D]">
          Analyze Resume
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#5E6987]">
          Match your resume against any job description for instant precision feedback.
        </p>
      </div>

      {/* Clean Single Card Form (Foundations Theme) */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-[#ADBBDA]/50 bg-white/90 backdrop-blur-xl p-5 sm:p-9 space-y-6 shadow-xl shadow-[#3D52A0]/5"
      >
        {submitError && (
          <div className="flex items-center gap-3 rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs sm:text-sm font-medium text-rose-700">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Resume Input */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-sm font-semibold text-[#18203D]">
              Resume
            </label>
            <button
              type="button"
              onClick={loadSample}
              className="text-xs font-semibold text-[#3D52A0] hover:text-[#18203D] underline underline-offset-2 transition cursor-pointer"
            >
              Use sample data
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
          />

          {resumeFile ? (
            <div className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-[#F8F6FC] border border-[#ADBBDA]/50">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="h-5 w-5 shrink-0 text-[#3D52A0]" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#18203D] truncate">
                    {resumeFile.name}
                  </p>
                  <p className="text-xs text-[#5E6987]">
                    {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setResumeFile(null)}
                className="p-1.5 rounded-lg text-[#5E6987] hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                title="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`group flex flex-col items-center justify-center py-7 px-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
                isDragging
                  ? "border-[#3D52A0] bg-[#EDE8F5]"
                  : "border-[#ADBBDA] bg-[#F8F6FC]/70 hover:border-[#7091E6] hover:bg-white"
              }`}
            >
              <UploadCloud className="h-6 w-6 text-[#3D52A0] group-hover:scale-105 transition-transform mb-2" />
              <p className="text-sm font-semibold text-[#18203D]">
                Drop your resume here, or <span className="underline underline-offset-2 text-[#3D52A0]">browse</span>
              </p>
              <p className="text-xs text-[#5E6987] mt-1">
                PDF or DOCX (up to 5MB)
              </p>
            </div>
          )}
        </div>

        {/* Job Description Input */}
        <div>
          <label className="block text-sm font-semibold text-[#18203D] mb-2">
            Target Job Description
          </label>
          <textarea
            rows={5}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste role requirements or description here..."
            className="w-full rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] p-4 text-sm text-[#18203D] placeholder-[#8697C4] outline-none transition focus:border-[#3D52A0] focus:ring-2 focus:ring-[#3D52A0]/10 leading-relaxed resize-y"
          />
        </div>

        {/* About You Input */}
        <div>
          <label className="block text-sm font-semibold text-[#18203D] mb-2">
            About You
          </label>
          <textarea
            rows={3}
            value={selfDescription}
            onChange={(e) => setSelfDescription(e.target.value)}
            placeholder="Brief summary of your experience, stack, and target level..."
            className="w-full rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] p-4 text-sm text-[#18203D] placeholder-[#8697C4] outline-none transition focus:border-[#3D52A0] focus:ring-2 focus:ring-[#3D52A0]/10 leading-relaxed resize-y"
          />
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={
              isSubmitting ||
              !resumeFile ||
              !jobDescription.trim() ||
              !selfDescription.trim()
            }
            className="w-full flex items-center justify-center gap-2 rounded-full bg-[#3D52A0] hover:bg-[#2F4080] text-white py-3.5 px-6 text-sm font-bold transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#3D52A0]/20"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Analyzing resume...</span>
              </>
            ) : (
              <>
                <span>Generate Analysis</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#5E6987]">
            <Wallet className="h-3.5 w-3.5 text-[#3D52A0]" />
            <span>Uses 1 credit • Balance: {user?.tokens ?? 3} credits</span>
          </p>
        </div>
      </form>

      {/* Real-time Multi-Stage Diagnostic Progress Stepper */}
      <DiagnosticProgressModal isAnalyzing={isSubmitting} />
    </div>
  );
};

export default InterviewBriefForm;
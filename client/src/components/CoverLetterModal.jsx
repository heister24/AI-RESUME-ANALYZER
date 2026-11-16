import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  Copy,
  Check,
  Loader2,
  Download,
  Building2,
  Sparkles,
  Send,
} from "lucide-react";
import { createCoverLetter } from "../services/aiApi";

const CoverLetterModal = ({
  isOpen,
  onClose,
  reportId,
  initialCompany = "",
  initialJob = "",
}) => {
  const [companyName, setCompanyName] = useState(initialCompany);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const res = await createCoverLetter({
        reportId,
        companyName: companyName.trim(),
        jobDescription: initialJob,
      });

      if (res && res.coverLetter) {
        setResult(res.coverLetter);
      } else {
        setError("Unable to generate cover letter. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to generate cover letter. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.fullLetter) return;
    navigator.clipboard.writeText(result.fullLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!result?.fullLetter) return;
    const blob = new Blob([result.fullLetter], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Cover_Letter_${(companyName || "Application").replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#18203D]/45 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-2xl rounded-3xl border border-[#ADBBDA]/60 bg-white shadow-2xl p-6 sm:p-8 text-[#18203D] max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-[#ADBBDA]/40 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ADBBDA]/60 bg-[#EDE8F5] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#3D52A0] mb-2">
                <FileText className="h-3 w-3" />
                AI Cover Letter Synthesizer
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#18203D]">
                Tailored Executive Cover Letter.
              </h2>
              <p className="text-xs text-[#5E6987] mt-1 leading-relaxed">
                Generates a role-specific, metric-backed letter calibrated directly
                to the job description and your resume strengths.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-[#5E6987] hover:text-[#18203D] hover:bg-[#EDE8F5] transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Configuration Form */}
          {!result && (
            <form onSubmit={handleGenerate} className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5E6987]">
                  Target Company / Team Name (Optional)
                </label>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8697C4]" />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Stripe, OpenAI, or Stealth Startup"
                    className="w-full rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#18203D] placeholder-[#8697C4] outline-none transition focus:border-[#3D52A0] focus:ring-1 focus:ring-[#7091E6]/30"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="pearl-btn w-full inline-flex items-center justify-center gap-2 rounded-full py-3 text-xs font-bold cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Synthesizing Persuasive Letter...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Tailored Cover Letter</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Letter Output Display */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 space-y-4"
            >
              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-[#F8F6FC] p-3 rounded-2xl border border-[#ADBBDA]/50">
                <span className="text-xs font-bold text-[#18203D] truncate max-w-64">
                  Subject: {result.subjectLine}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="ghost-btn inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadTxt}
                    className="pearl-btn inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download .txt</span>
                  </button>
                </div>
              </div>

              {/* Formatted Letter Body */}
              <div className="rounded-2xl border border-[#ADBBDA]/60 bg-white p-5 sm:p-7 space-y-3.5 text-xs sm:text-sm text-[#18203D] leading-relaxed font-serif shadow-xs">
                <p className="font-bold text-xs uppercase text-[#5E6987]">
                  {result.salutation}
                </p>

                <p>{result.openingHook}</p>
                <p>{result.bodyParagraph1}</p>
                <p>{result.bodyParagraph2}</p>
                <p>{result.conclusionAndCallToAction}</p>

                <p className="pt-2 whitespace-pre-wrap font-sans font-semibold text-xs text-[#5E6987]">
                  {result.signOff}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="text-xs font-semibold text-[#5E6987] hover:text-[#3D52A0] hover:underline cursor-pointer"
                >
                  &larr; Re-generate for different company
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CoverLetterModal;

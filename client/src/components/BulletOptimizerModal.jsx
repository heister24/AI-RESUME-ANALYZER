import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  SlidersHorizontal,
  Copy,
  Check,
  Loader2,
  ArrowRight,
  TrendingUp,
  Award,
  Terminal,
} from "lucide-react";
import { rewriteBullet } from "../services/aiApi";

const sampleBullets = [
  "Worked on React frontend and fixed UI bugs to make it faster.",
  "Responsible for managing backend APIs and database queries.",
  "Led a team of developers to build the new mobile checkout.",
];

const BulletOptimizerModal = ({ isOpen, onClose, initialRole = "" }) => {
  const [rawBullet, setRawBullet] = useState("");
  const [targetRole, setTargetRole] = useState(initialRole);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const handleOptimize = async (e) => {
    e.preventDefault();
    if (!rawBullet.trim() || rawBullet.trim().length < 5) {
      setError("Please enter a bullet point of at least 5 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);
      const res = await rewriteBullet({
        rawBullet: rawBullet.trim(),
        targetRole: targetRole.trim(),
      });

      if (res && res.optimization) {
        setResult(res.optimization);
      } else {
        setError("Failed to get optimized variations. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to optimize bullet. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
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
                <SlidersHorizontal className="h-3 w-3" />
                Google XYZ Formula Optimizer
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#18203D]">
                Elevate your resume bullet.
              </h2>
              <p className="text-xs text-[#5E6987] mt-1 leading-relaxed">
                Transform passive duties into quantified impact:{" "}
                <span className="font-semibold text-[#3D52A0]">
                  "Accomplished [X] as measured by [Y], by doing [Z]"
                </span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-[#5E6987] hover:text-[#18203D] hover:bg-[#EDE8F5] transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleOptimize} className="mt-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5E6987]">
                  Your Raw / Unpolished Bullet
                </label>
                <div className="flex items-center gap-1 text-[11px] text-[#5E6987]">
                  <span>Try:</span>
                  <button
                    type="button"
                    onClick={() => setRawBullet(sampleBullets[0])}
                    className="text-[#3D52A0] hover:underline cursor-pointer"
                  >
                    Sample 1
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setRawBullet(sampleBullets[1])}
                    className="text-[#3D52A0] hover:underline cursor-pointer"
                  >
                    Sample 2
                  </button>
                </div>
              </div>
              <textarea
                value={rawBullet}
                onChange={(e) => setRawBullet(e.target.value)}
                placeholder="e.g. Worked on frontend bugs and improved app loading speed..."
                className="w-full min-h-24 rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] px-4 py-3 text-xs sm:text-sm text-[#18203D] placeholder-[#8697C4] outline-none transition focus:border-[#3D52A0] focus:ring-1 focus:ring-[#7091E6]/30 leading-relaxed"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#5E6987]">
                Target Job Role (Optional)
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer @ Stripe"
                className="w-full rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] px-4 py-2.5 text-xs sm:text-sm text-[#18203D] placeholder-[#8697C4] outline-none transition focus:border-[#3D52A0] focus:ring-1 focus:ring-[#7091E6]/30"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !rawBullet.trim()}
              className="pearl-btn w-full inline-flex items-center justify-center gap-2 rounded-full py-3 text-xs font-bold cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Synthesizing Google XYZ Variations...</span>
                </>
              ) : (
                <>
                  <span>Optimize Bullet Point</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Results Display */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 pt-6 border-t border-[#ADBBDA]/40 space-y-4"
            >
              {/* Recruiter Critique */}
              {result.critique && (
                <div className="rounded-2xl border border-[#ADBBDA]/50 bg-[#EDE8F5]/80 p-3.5 text-xs text-[#18203D] leading-relaxed">
                  <span className="font-bold text-[#3D52A0] block mb-1">
                    Recruiter Assessment:
                  </span>
                  {result.critique}
                </div>
              )}

              {/* 3 Variations */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5E6987] block">
                  3 Polished Variations:
                </span>

                {result.variations?.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] p-4 transition hover:border-[#3D52A0]/40 shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#EDE8F5] border border-[#ADBBDA]/50 px-2.5 py-0.5 text-[10px] font-bold text-[#3D52A0]">
                        {item.type}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleCopy(item.rewrittenBullet, idx)}
                        className="ghost-btn inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold cursor-pointer"
                        title="Copy to clipboard"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy Bullet</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-[#18203D] leading-relaxed">
                      &bull; {item.rewrittenBullet}
                    </p>

                    {item.highlightedMetric && (
                      <p className="mt-2 text-[11px] text-[#5E6987]">
                        <span className="font-semibold text-[#3D52A0]">
                          Metric Added:
                        </span>{" "}
                        {item.highlightedMetric}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BulletOptimizerModal;

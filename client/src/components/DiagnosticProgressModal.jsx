import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  Code2,
  CalendarDays,
  CheckCircle2,
  Loader2,
  Activity,
} from "lucide-react";

const STAGES = [
  {
    step: 1,
    title: "Document Ingestion & Text Layer Extraction",
    desc: "Validating character encoding, binary headers, and OCR readability.",
    icon: FileText,
    durationMs: 3000,
  },
  {
    step: 2,
    title: "ATS Keyword Density & Seniority Calibration",
    desc: "Benchmarking semantic match against enterprise Workday & Taleo heuristics.",
    icon: Search,
    durationMs: 4000,
  },
  {
    step: 3,
    title: "Synthesizing Strategic Q&A & Skill Gaps",
    desc: "Auditing missing competencies and generating model interview strategies.",
    icon: Code2,
    durationMs: 3500,
  },
  {
    step: 4,
    title: "Compiling 7-Day Sprint Roadmap & Heatmap",
    desc: "Structuring taxonomy breakdown and final diagnostic package.",
    icon: CalendarDays,
    durationMs: 3000,
  },
];

const DiagnosticProgressModal = ({ isAnalyzing }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [percent, setPercent] = useState(10);

  useEffect(() => {
    if (!isAnalyzing) {
      setCurrentStageIdx(0);
      setPercent(10);
      return;
    }

    // Dynamic stage progression
    const timer1 = setTimeout(() => {
      setCurrentStageIdx(1);
      setPercent(35);
    }, 3000);

    const timer2 = setTimeout(() => {
      setCurrentStageIdx(2);
      setPercent(65);
    }, 7000);

    const timer3 = setTimeout(() => {
      setCurrentStageIdx(3);
      setPercent(90);
    }, 10500);

    // Continuous micro-increment
    const interval = setInterval(() => {
      setPercent((prev) => (prev < 95 ? prev + 1 : prev));
    }, 400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(interval);
    };
  }, [isAnalyzing]);

  if (!isAnalyzing) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#18203D]/50 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-lg rounded-3xl border border-[#ADBBDA]/60 bg-white shadow-2xl p-6 sm:p-8 text-[#18203D]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#ADBBDA]/40 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7091E6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3D52A0]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#3D52A0]">
                AI Diagnostic Engine Active
              </span>
            </div>

            <span className="text-sm font-extrabold text-[#3D52A0]">
              {percent}%
            </span>
          </div>

          {/* Overall Progress Bar */}
          <div className="h-2 w-full rounded-full bg-[#EDE8F5] border border-[#ADBBDA]/40 overflow-hidden mb-6">
            <div
              className="h-full rounded-full bg-[#3D52A0] transition-all duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#18203D] mb-1">
            Analyzing candidate profile...
          </h3>
          <p className="text-xs text-[#5E6987] mb-6">
            Please keep this tab open while our engine calibrates your resume against the target role.
          </p>

          {/* Stepper Pipeline */}
          <div className="space-y-4">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isPast = idx < currentStageIdx;
              const isCurrent = idx === currentStageIdx;
              const isFuture = idx > currentStageIdx;

              return (
                <div
                  key={stage.step}
                  className={`flex items-start gap-3.5 p-3 rounded-2xl transition-all ${
                    isCurrent
                      ? "bg-[#EDE8F5]/80 border border-[#3D52A0]/40 shadow-xs"
                      : isPast
                        ? "bg-white/60 border border-transparent opacity-80"
                        : "opacity-40"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all ${
                      isPast
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : isCurrent
                          ? "bg-[#3D52A0] text-white shadow-xs"
                          : "bg-[#EDE8F5] text-[#8697C4]"
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : isCurrent ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-bold leading-tight ${
                        isCurrent
                          ? "text-[#18203D]"
                          : isPast
                            ? "text-[#18203D]/90"
                            : "text-[#8697C4]"
                      }`}
                    >
                      {stage.title}
                    </p>
                    <p className="text-[11px] text-[#5E6987] mt-0.5 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[#ADBBDA]/30 flex items-center justify-between text-[11px] text-[#8697C4]">
            <span>Average runtime: ~8–12 seconds</span>
            <span className="font-semibold text-[#3D52A0]">Gemini 3.5 Flash</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DiagnosticProgressModal;

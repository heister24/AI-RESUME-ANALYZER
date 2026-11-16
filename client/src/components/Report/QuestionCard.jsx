import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Compass, Target } from "lucide-react";

const QuestionCard = ({ question, idx, forceOpen, type = "technical" }) => {
  const [isOpen, setIsOpen] = useState(idx === 0);

  useEffect(() => {
    if (forceOpen !== undefined && forceOpen !== null) {
      setIsOpen(forceOpen);
    }
  }, [forceOpen]);

  const numberStr = (idx + 1).toString().padStart(2, "0");

  return (
    <div className="rounded-2xl border border-[#ADBBDA]/50 bg-white/90 transition-all hover:border-[#7091E6] hover:shadow-md hover:shadow-[#3D52A0]/5 overflow-hidden text-[#18203D]">
      {/* Header bar / Clickable to toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3.5 cursor-pointer hover:bg-[#EDE8F5]/20 transition"
      >
        <div className="flex items-start gap-3 min-w-0">
          <span className="shrink-0 rounded-lg bg-[#EDE8F5] border border-[#ADBBDA]/60 px-2 py-0.5 text-xs font-mono font-bold text-[#3D52A0]">
            {numberStr}
          </span>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-[#18203D] leading-snug">
              {question.question}
            </h3>
            {/* Short preview of intention when closed */}
            {!isOpen && question.intention && (
              <p className="mt-1 text-xs text-[#5E6987] truncate max-w-2xl">
                Goal: {question.intention}
              </p>
            )}
          </div>
        </div>

        <div className="shrink-0 mt-0.5 text-[#5E6987]">
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </button>

      {/* Expanded Details */}
      {isOpen && (
        <div className="px-4 sm:px-5 pb-5 pt-0 space-y-3.5 border-t border-[#ADBBDA]/30">
          {/* Interviewer Intention */}
          {question.intention && (
            <div className="mt-3.5 rounded-xl bg-[#EDE8F5]/60 border border-[#ADBBDA]/40 p-3.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#3D52A0] mb-1">
                <Target className="h-3 w-3 text-[#3D52A0]" />
                <span>What the Interviewer is Evaluating</span>
              </div>
              <p className="text-xs sm:text-sm text-[#18203D]/90 leading-relaxed">
                {question.intention}
              </p>
            </div>
          )}

          {/* Model Answer / Guidance */}
          {question.answer && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#5E6987]">
                <Compass className="h-3 w-3 text-[#3D52A0]" />
                <span>Recommended Answer Strategy</span>
              </div>
              <div className="rounded-xl bg-[#F8F6FC] border border-[#ADBBDA]/40 p-3.5 sm:p-4 text-xs sm:text-sm text-[#18203D]/90 leading-relaxed whitespace-pre-line">
                {question.answer}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
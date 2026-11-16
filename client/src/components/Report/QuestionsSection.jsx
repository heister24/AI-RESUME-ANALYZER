import { useState } from "react";
import QuestionCard from "./QuestionCard";

const QuestionsSection = ({
  title,
  subtitle,
  icon: Icon,
  questions = [],
  type = "technical",
}) => {
  const [allExpanded, setAllExpanded] = useState(null);

  if (!questions || questions.length === 0) return null;

  return (
    <section className="space-y-3.5">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EDE8F5] text-[#3D52A0] border border-[#ADBBDA]/60">
              <Icon className="h-4 w-4" />
            </div>
          )}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#18203D]">{title}</h2>
            {subtitle && <p className="text-xs text-[#5E6987]">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-[#ADBBDA]/60 bg-white/80 px-3 py-0.5 text-xs font-semibold text-[#3D52A0]">
            {questions.length} {questions.length === 1 ? "Question" : "Questions"}
          </span>

          <button
            type="button"
            onClick={() => setAllExpanded((prev) => (prev ? false : true))}
            className="text-xs text-[#3D52A0] hover:text-[#18203D] underline underline-offset-2 transition cursor-pointer px-1.5 py-0.5"
          >
            {allExpanded ? "Collapse All" : "Expand All"}
          </button>
        </div>
      </div>

      {/* Questions Stack */}
      <div className="space-y-3">
        {questions.map((q, idx) => (
          <QuestionCard
            key={idx}
            question={q}
            idx={idx}
            type={type}
            forceOpen={allExpanded}
          />
        ))}
      </div>
    </section>
  );
};

export default QuestionsSection;
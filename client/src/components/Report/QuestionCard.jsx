import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight } from "lucide-react";

const QuestionCard = ({ question, idx, color }) => {
  const [isOpen, setIsOpen] = useState(false);

  const bgHover =
    color === "purple" ? "hover:border-purple-200" : "hover:border-teal-200";
  const lineHover =
    color === "purple" ? "group-hover:bg-purple-400" : "group-hover:bg-teal-400";
  const badgeColors =
    color === "purple"
      ? "bg-purple-50 text-purple-700"
      : "bg-teal-50 text-teal-700";

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/90 shadow-sm transition-all ${bgHover} cursor-pointer`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`absolute left-0 top-0 h-full w-1 bg-gray-200 transition-colors ${lineHover}`}
      />

      <div className="p-6 sm:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div
              className={`mb-3 inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${badgeColors}`}
            >
              Question {idx + 1}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              {question.question}
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-gray-500 leading-relaxed border-l-2 border-gray-200 pl-3">
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
          <div className="mt-4 rounded-xl bg-gray-50 p-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-1.5">
              <BookOpen className="h-4 w-4 text-gray-500" />
              <span className="font-bold text-gray-700 text-xs sm:text-sm">
                Suggested Strategy
              </span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {question.answer}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestionCard;

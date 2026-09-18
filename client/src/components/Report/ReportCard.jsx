import { motion } from "framer-motion";
import {
  AlertTriangle,
  CalendarDays,
  Code2,
  ChevronRight,
  Trash2,
  Loader2,
} from "lucide-react";
import { getJobTitle, getScoreBadgeClass, formatReportDate } from "./reportUtils";

const ReportCard = ({ report, onSelect, onDelete, isDeleting }) => {
  const score = report.matchScore || 0;
  const gapsCount = report.skillGaps?.length || 0;
  const planDays = report.prepairationPlan?.length || 0;
  const questionsCount =
    (report.technicalQuestions?.length || 0) +
    (report.behaviouralQuestions?.length || 0);

  const title = getJobTitle(report.jobDescription);
  const dateFormatted = formatReportDate(report.createdAt);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(report)}
      className="group cursor-pointer relative flex flex-col justify-between rounded-3xl border border-gray-200/70 bg-white/80 p-6 shadow-md transition-all hover:border-emerald-300 hover:shadow-xl backdrop-blur-xl"
    >
      <div>
        {/* Card Top: Match Score Gauge & Date */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 font-extrabold text-sm ${getScoreBadgeClass(
              score
            )}`}
          >
            {score}%
          </div>

          <span className="text-[11px] font-semibold text-gray-400">
            {dateFormatted}
          </span>
        </div>

        {/* Job Title / Excerpt */}
        <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Brief description snippet */}
        <p className="mt-2 text-xs text-gray-500 line-clamp-2 leading-relaxed">
          {report.jobDescription || "No role description details available."}
        </p>

        {/* Summary Badges */}
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-xl bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 border border-amber-200/60">
            <AlertTriangle className="h-3 w-3" />
            {gapsCount} {gapsCount === 1 ? "Gap" : "Gaps"}
          </span>

          <span className="inline-flex items-center gap-1 rounded-xl bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 border border-blue-200/60">
            <CalendarDays className="h-3 w-3" />
            {planDays}-Day Plan
          </span>

          <span className="inline-flex items-center gap-1 rounded-xl bg-purple-50 px-2.5 py-1 text-[11px] font-semibold text-purple-700 border border-purple-200/60">
            <Code2 className="h-3 w-3" />
            {questionsCount} Qs
          </span>
        </div>
      </div>

      {/* Card Bottom Actions */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
          View Analysis
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>

        <button
          type="button"
          onClick={(e) => onDelete(e, report._id)}
          disabled={isDeleting}
          className="cursor-pointer rounded-xl p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
          title="Delete Report"
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin text-red-600" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default ReportCard;

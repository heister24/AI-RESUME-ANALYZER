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
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      onClick={() => onSelect(report)}
      className="group cursor-pointer relative flex flex-col justify-between rounded-2xl border border-[#ADBBDA]/50 bg-white/90 p-5 sm:p-6 transition-all hover:border-[#7091E6] hover:shadow-xl hover:shadow-[#3D52A0]/8 text-[#18203D]"
    >
      <div>
        {/* Card Top: Match Score Gauge & Date */}
        <div className="flex items-center justify-between mb-3.5">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl border font-bold text-xs ${getScoreBadgeClass(
              score,
            )}`}
          >
            {score}%
          </div>

          <span className="text-[11px] font-medium text-[#5E6987]">
            {dateFormatted}
          </span>
        </div>

        {/* Job Title */}
        <h3 className="text-sm sm:text-base font-bold text-[#18203D] group-hover:text-[#3D52A0] transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Brief description snippet */}
        <p className="mt-1.5 text-xs text-[#5E6987] line-clamp-2 leading-relaxed">
          {report.jobDescription || "No role specification excerpt provided."}
        </p>

        {/* Summary Badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#EDE8F5]/80 px-2.5 py-0.5 text-[10px] font-medium text-[#5E6987] border border-[#ADBBDA]/40">
            <AlertTriangle className="h-3 w-3 text-amber-600" />
            {gapsCount} {gapsCount === 1 ? "Gap" : "Gaps"}
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-[#EDE8F5]/80 px-2.5 py-0.5 text-[10px] font-medium text-[#5E6987] border border-[#ADBBDA]/40">
            <CalendarDays className="h-3 w-3 text-[#3D52A0]" />
            {planDays}d Plan
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-[#EDE8F5]/80 px-2.5 py-0.5 text-[10px] font-medium text-[#5E6987] border border-[#ADBBDA]/40">
            <Code2 className="h-3 w-3 text-[#3D52A0]" />
            {questionsCount} Qs
          </span>
        </div>
      </div>

      {/* Card Bottom Actions */}
      <div className="mt-5 flex items-center justify-between border-t border-[#ADBBDA]/30 pt-3.5">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#3D52A0] group-hover:underline">
          <span>Open Analysis</span>
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>

        <button
          type="button"
          onClick={(e) => onDelete(e, report._id)}
          disabled={isDeleting}
          className="cursor-pointer rounded-xl p-1.5 text-[#5E6987] hover:bg-rose-50 hover:text-rose-600 transition"
          title="Delete Report"
        >
          {isDeleting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-rose-500" />
          ) : (
            <Trash2 className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default ReportCard;
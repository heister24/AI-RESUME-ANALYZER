import { ArrowLeft, Award, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  getJobTitle,
  getScoreBadgeClass,
  formatReportDate,
} from "./reportUtils";

const ReportDetailHeader = ({
  selectedReport,
  reports = [],
  onSelectReport,
  onBack,
}) => {
  const score = selectedReport.matchScore || 0;
  const title = getJobTitle(selectedReport.jobDescription);
  const dateFormatted = formatReportDate(selectedReport.createdAt);

  return (
    <div>
      {/* Top Navigation Row */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer group inline-flex items-center text-sm font-semibold text-gray-600 transition hover:text-emerald-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          All Saved Reports ({reports.length})
        </button>

        <div className="flex flex-wrap items-center gap-3">
          {/* Switch Report Dropdown if multiple reports exist */}
          {reports.length > 1 && (
            <div className="relative flex items-center gap-2">
              <span className="hidden sm:inline text-xs font-semibold text-gray-500">
                Switch:
              </span>
              <select
                value={selectedReport._id || ""}
                onChange={(e) => {
                  const target = reports.find((r) => r._id === e.target.value);
                  if (target) onSelectReport(target);
                }}
                className="cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-xs outline-none"
              >
                {reports.map((r) => (
                  <option key={r._id} value={r._id}>
                    {getJobTitle(r.jobDescription)} ({r.matchScore || 0}%)
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* New Analysis Link */}
          <Link
            to="/interview"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700"
          >
            <Plus className="h-3.5 w-3.5" />
            New Analysis
          </Link>
        </div>
      </div>

      {/* Hero Score Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/75 p-6 shadow-xl backdrop-blur-xl sm:p-10 mb-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/60 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <Award className="h-4 w-4" />
              <span>Analysis Complete</span>
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              {title}
            </h1>
            <p className="mt-2 text-xs text-gray-500">
              Generated on {dateFormatted}
            </p>
          </div>

          {/* Score Gauge Widget */}
          <div className="flex shrink-0 items-center gap-5 rounded-2xl bg-white/90 p-5 shadow-sm border border-gray-200/70">
            <div className="flex flex-col text-right">
              <span className="text-sm font-bold text-gray-900">
                Overall Match
              </span>
              <span className="text-xs text-gray-500">Role Compatibility</span>
            </div>
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full border-4 shadow-sm ${getScoreBadgeClass(
                score,
              )}`}
            >
              <span className="text-xl font-extrabold">{score}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailHeader;

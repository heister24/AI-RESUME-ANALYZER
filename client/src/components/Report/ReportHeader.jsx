import { Sparkles, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const ReportHeader = ({ totalCount, avgScore, highestScore }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/75 p-6 shadow-xl backdrop-blur-xl sm:p-10 mb-8">
      {/* Decorative ambient aura */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 px-3.5 py-1 text-xs font-bold text-emerald-700 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Interview Analysis Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Your Saved{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">
              Resume Reports
            </span>
          </h1>
          <p className="mt-2 text-sm text-gray-600 max-w-xl leading-relaxed">
            Compare ATS match scores, track your preparation roadmaps, and review technical questions generated for each target role.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Summary Metric Badges */}
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-gray-200/70 bg-white/80 p-4 min-w-28 text-center shadow-xs">
              <div className="text-xs font-semibold uppercase text-gray-500">
                Total
              </div>
              <div className="text-2xl font-extrabold text-gray-900 mt-1">
                {totalCount}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200/70 bg-white/80 p-4 min-w-28 text-center shadow-xs">
              <div className="text-xs font-semibold uppercase text-gray-500">
                Avg Match
              </div>
              <div className="text-2xl font-extrabold text-emerald-600 mt-1">
                {avgScore}%
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200/70 bg-white/80 p-4 min-w-28 text-center shadow-xs">
              <div className="text-xs font-semibold uppercase text-gray-500">
                Top Score
              </div>
              <div className="text-2xl font-extrabold text-teal-600 mt-1">
                {highestScore}%
              </div>
            </div>
          </div>

          <Link
            to="/interview"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" />
            New Analysis
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;

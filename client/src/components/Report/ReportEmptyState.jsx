import { FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const ReportEmptyState = ({ isFiltered, onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200/70 bg-white/80 p-12 text-center shadow-xl backdrop-blur-xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 mb-4 shadow-sm">
        <FileText className="h-8 w-8" />
      </div>

      <h3 className="text-xl font-bold text-gray-900">
        {isFiltered ? "No Matching Reports Found" : "No Reports Generated Yet"}
      </h3>

      <p className="mt-2 max-w-md text-xs text-gray-500 leading-relaxed">
        {isFiltered
          ? "Try adjusting your search keywords or score filters to find saved reports."
          : "Upload your resume PDF and target job description to get instant ATS scores, gap diagnostics, and tailored interview plans."}
      </p>

      {isFiltered ? (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-5 text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
        >
          Clear Search Filters
        </button>
      ) : (
        <Link
          to="/interview"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" />
          Start Your First Analysis
        </Link>
      )}
    </div>
  );
};

export default ReportEmptyState;

import { FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const ReportEmptyState = ({ isFiltered, onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-[#ADBBDA]/50 bg-white/90 p-12 text-center shadow-xl shadow-[#3D52A0]/5 backdrop-blur-xl text-[#18203D]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8F5] text-[#3D52A0] mb-4 border border-[#ADBBDA]/60">
        <FileText className="h-6 w-6" />
      </div>

      <h3 className="text-xl font-bold text-[#18203D]">
        {isFiltered ? "No Matching Reports Found" : "No Reports Generated Yet"}
      </h3>

      <p className="mt-2 max-w-md text-xs sm:text-sm text-[#5E6987] leading-relaxed">
        {isFiltered
          ? "Try adjusting your search query or score threshold filters to find saved reports."
          : "Upload your resume PDF and target job description to get instant ATS scores, gap diagnostics, and tailored interview plans."}
      </p>

      {isFiltered ? (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-5 text-xs font-bold text-[#3D52A0] underline hover:opacity-80 cursor-pointer"
        >
          Clear Search Filters
        </button>
      ) : (
        <Link
          to="/interview"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3D52A0] px-6 py-3 text-xs font-bold text-white shadow-md shadow-[#3D52A0]/20 transition hover:bg-[#2F4080]"
        >
          <Plus className="h-4 w-4" />
          Start Your First Analysis
        </Link>
      )}
    </div>
  );
};

export default ReportEmptyState;
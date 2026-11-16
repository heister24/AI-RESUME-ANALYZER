import { Search, ArrowUpDown } from "lucide-react";

const ReportFilters = ({
  searchQuery,
  setSearchQuery,
  scoreFilter,
  setScoreFilter,
  sortBy,
  setSortBy,
  totalCount,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 mb-8">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#5E6987]" />
        <input
          type="text"
          placeholder="Filter by role, company, or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-full border border-[#ADBBDA]/60 bg-white/90 py-2 pl-9 pr-4 text-xs font-medium text-[#18203D] placeholder-[#8697C4] outline-none transition focus:border-[#3D52A0] focus:ring-1 focus:ring-[#3D52A0]/20"
        />
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Score Tier Filter Pills */}
        <div className="flex items-center gap-1 rounded-full border border-[#ADBBDA]/60 bg-white/80 p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setScoreFilter("all")}
            className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition ${
              scoreFilter === "all"
                ? "bg-[#3D52A0] text-white font-bold shadow-xs"
                : "text-[#5E6987] hover:text-[#3D52A0]"
            }`}
          >
            All ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setScoreFilter("high")}
            className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition ${
              scoreFilter === "high"
                ? "bg-[#3D52A0] text-white font-bold shadow-xs"
                : "text-[#5E6987] hover:text-[#3D52A0]"
            }`}
          >
            80%+ Fit
          </button>
          <button
            type="button"
            onClick={() => setScoreFilter("medium")}
            className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition ${
              scoreFilter === "medium"
                ? "bg-[#3D52A0] text-white font-bold shadow-xs"
                : "text-[#5E6987] hover:text-[#3D52A0]"
            }`}
          >
            50-79%
          </button>
          <button
            type="button"
            onClick={() => setScoreFilter("low")}
            className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition ${
              scoreFilter === "low"
                ? "bg-[#3D52A0] text-white font-bold shadow-xs"
                : "text-[#5E6987] hover:text-[#3D52A0]"
            }`}
          >
            &lt;50%
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1.5 rounded-full border border-[#ADBBDA]/60 bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#18203D] shadow-xs">
          <ArrowUpDown className="h-3 w-3 text-[#5E6987]" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="cursor-pointer bg-transparent text-[#18203D] outline-none text-xs"
          >
            <option value="newest" className="bg-white text-[#18203D]">
              Newest First
            </option>
            <option value="highest" className="bg-white text-[#18203D]">
              Highest Fit
            </option>
            <option value="lowest" className="bg-white text-[#18203D]">
              Lowest Fit
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;
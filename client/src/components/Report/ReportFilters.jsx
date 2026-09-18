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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by job title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-xs font-medium text-gray-900 shadow-xs outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
        />
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Score Tier Filter Pills */}
        <div className="flex items-center gap-1 rounded-2xl border border-gray-200 bg-white p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setScoreFilter("all")}
            className={`cursor-pointer rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              scoreFilter === "all"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            All ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setScoreFilter("high")}
            className={`cursor-pointer rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              scoreFilter === "high"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            80%+ Match
          </button>
          <button
            type="button"
            onClick={() => setScoreFilter("medium")}
            className={`cursor-pointer rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              scoreFilter === "medium"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            50-79%
          </button>
          <button
            type="button"
            onClick={() => setScoreFilter("low")}
            className={`cursor-pointer rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              scoreFilter === "low"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            &lt;50%
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1.5 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-xs">
          <ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="cursor-pointer bg-transparent outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="highest">Highest Score</option>
            <option value="lowest">Lowest Score</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;

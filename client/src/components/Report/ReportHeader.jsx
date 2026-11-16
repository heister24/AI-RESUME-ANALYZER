import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const ReportHeader = ({ totalCount, avgScore, highestScore }) => {
  return (
    <div className="rounded-3xl border border-[#ADBBDA]/50 bg-white/90 backdrop-blur-xl p-6 sm:p-8 mb-8 shadow-xl shadow-[#3D52A0]/5 text-[#18203D]">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E6987]">
            Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#18203D] mt-1">
            Saved Reports
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#5E6987] max-w-lg leading-relaxed">
            Review past resume evaluations, target match scores, and customized preparation plans.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="flex-1 sm:flex-initial rounded-2xl border border-[#ADBBDA]/40 bg-[#EDE8F5]/60 p-3 min-w-20 text-center">
              <div className="text-[10px] font-medium uppercase tracking-wider text-[#5E6987]">
                Reports
              </div>
              <div className="text-lg font-bold text-[#18203D] mt-0.5">
                {totalCount}
              </div>
            </div>

            <div className="flex-1 sm:flex-initial rounded-2xl border border-[#ADBBDA]/40 bg-[#EDE8F5]/60 p-3 min-w-20 text-center">
              <div className="text-[10px] font-medium uppercase tracking-wider text-[#5E6987]">
                Avg Match
              </div>
              <div className="text-lg font-bold text-[#18203D] mt-0.5">
                {avgScore}%
              </div>
            </div>

            <div className="flex-1 sm:flex-initial rounded-2xl border border-[#ADBBDA]/40 bg-[#EDE8F5]/60 p-3 min-w-20 text-center">
              <div className="text-[10px] font-medium uppercase tracking-wider text-[#5E6987]">
                Top Match
              </div>
              <div className="text-lg font-bold text-[#3D52A0] mt-0.5">
                {highestScore}%
              </div>
            </div>
          </div>

          <Link
            to="/interview"
            className="w-full sm:w-auto pearl-btn flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Analysis</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
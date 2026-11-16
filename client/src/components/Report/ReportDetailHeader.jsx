import { useState } from "react";
import {
  ArrowLeft,
  Download,
  Loader2,
  Copy,
  Check,
  Plus,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Code2,
  Users,
  CalendarDays,
  SlidersHorizontal,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  getJobTitle,
  getScoreBadgeClass,
  getScoreLabel,
  formatReportDate,
} from "./reportUtils";
import { downloadReportAsPDF } from "../../utils/pdfExport";
import BulletOptimizerModal from "../BulletOptimizerModal";
import CoverLetterModal from "../CoverLetterModal";

const ReportDetailHeader = ({
  selectedReport,
  reports = [],
  onSelectReport,
  onBack,
  activeTab,
  setActiveTab,
}) => {
  const [copied, setCopied] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showOptimizer, setShowOptimizer] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  const score = selectedReport.matchScore || 0;
  const title = getJobTitle(selectedReport.jobDescription);
  const dateFormatted = formatReportDate(selectedReport.createdAt);

  const gapsCount = selectedReport.skillGaps?.length || 0;
  const techCount = selectedReport.technicalQuestions?.length || 0;
  const behCount = selectedReport.behaviouralQuestions?.length || 0;
  const planDays = selectedReport.prepairationPlan?.length || 0;

  const handleCopySummary = () => {
    const summaryText = `ResumeLens Analysis Report\nRole: ${title}\nMatch Score: ${score}% (${getScoreLabel(
      score,
    )})\nSkill Gaps: ${gapsCount}\nTechnical Questions: ${techCount}\nBehavioral Questions: ${behCount}\nPlan: ${planDays} Days`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPdf = () => {
    setIsExporting(true);

    // Ensure all sections are active so the PDF captures the complete report
    if (activeTab !== "all") {
      setActiveTab("all");
    }

    downloadReportAsPDF({
      onAfterPrint: () => {
        setIsExporting(false);
      },
    });

    // Auto reset state after 1.5s to ensure UI never stays locked
    setTimeout(() => {
      setIsExporting(false);
    }, 1500);
  };

  const tabs = [
    { id: "all", label: "All Sections" },
    {
      id: "gaps",
      label: `Skill Gaps (${gapsCount})`,
      icon: AlertTriangle,
    },
    {
      id: "technical",
      label: `Technical Q&A (${techCount})`,
      icon: Code2,
    },
    {
      id: "behavioural",
      label: `Behavioral Q&A (${behCount})`,
      icon: Users,
    },
    {
      id: "plan",
      label: `7-Day Plan (${planDays}d)`,
      icon: CalendarDays,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Top Utility Nav (Excluded from PDF) */}
      <div
        data-html2canvas-ignore="true"
        className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ADBBDA]/30 pb-3.5"
      >
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center text-xs font-semibold text-[#5E6987] hover:text-[#3D52A0] transition cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          <span>All Saved Reports ({reports.length})</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Switch report dropdown if user has multiple reports */}
          {reports.length > 1 && (
            <select
              value={selectedReport._id || ""}
              onChange={(e) => {
                const target = reports.find((r) => r._id === e.target.value);
                if (target) onSelectReport(target);
              }}
              className="cursor-pointer rounded-full border border-[#ADBBDA]/60 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#18203D] outline-none"
            >
              {reports.map((r) => (
                <option
                  key={r._id}
                  value={r._id}
                  className="bg-white text-[#18203D]"
                >
                  {getJobTitle(r.jobDescription)} ({r.matchScore || 0}%)
                </option>
              ))}
            </select>
          )}

          {/* Copy Brief */}
          <button
            type="button"
            onClick={handleCopySummary}
            className="ghost-btn inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold cursor-pointer"
            title="Copy summary to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Copy Summary</span>
              </>
            )}
          </button>

          {/* Bullet Optimizer Modal Trigger */}
          <button
            type="button"
            onClick={() => setShowOptimizer(true)}
            className="ghost-btn inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold cursor-pointer text-[#3D52A0] hover:bg-[#EDE8F5]"
            title="Rewrite weak resume bullets using Google's XYZ formula"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Optimize Bullets</span>
          </button>

          {/* AI Cover Letter Modal Trigger */}
          <button
            type="button"
            onClick={() => setShowCoverLetter(true)}
            className="ghost-btn inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold cursor-pointer text-[#3D52A0] hover:bg-[#EDE8F5]"
            title="Generate a targeted AI cover letter for this role"
          >
            <FileText className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cover Letter</span>
          </button>

          {/* Export PDF Button */}
          <button
            type="button"
            onClick={handleExportPdf}
            disabled={isExporting}
            className="pearl-btn inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold cursor-pointer disabled:opacity-60 shadow-xs"
            title="Download formatted diagnostic report as PDF"
          >
            {isExporting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5" />
                <span>Export PDF</span>
              </>
            )}
          </button>

          {/* New Analysis */}
          <Link
            to="/interview"
            className="ghost-btn inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Analysis</span>
          </Link>
        </div>
      </div>

      {/* Main Executive Summary Card (Foundations Theme) */}
      <div className="rounded-3xl border border-[#ADBBDA]/50 bg-white/90 backdrop-blur-xl p-5 sm:p-7 shadow-xl shadow-[#3D52A0]/5 text-[#18203D]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-5 border-b border-[#ADBBDA]/30">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E6987]">
                Analysis Report
              </span>
              <span className="h-1 w-1 rounded-full bg-[#ADBBDA]" />
              <span className="text-[11px] text-[#5E6987]">{dateFormatted}</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#18203D]">
              {title}
            </h1>
          </div>

          {/* Score Badge */}
          <div className="flex items-center gap-3.5 shrink-0">
            <div
              className={`flex h-14 w-14 sm:h-15 sm:w-15 items-center justify-center rounded-2xl border font-black text-xl sm:text-2xl ${getScoreBadgeClass(
                score,
              )}`}
            >
              {score}%
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#18203D]">
                {getScoreLabel(score)}
              </div>
              <div className="text-[11px] text-[#5E6987]">Match Assessment</div>
            </div>
          </div>
        </div>

        {/* 4 Summary Stat Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5">
          <div className="rounded-2xl border border-[#ADBBDA]/40 bg-[#EDE8F5]/60 p-3 sm:p-3.5 text-center">
            <div className="text-[10px] font-bold text-[#5E6987] uppercase tracking-wider">
              Skill Gaps
            </div>
            <div className="text-base sm:text-lg font-bold text-[#18203D] mt-0.5">
              {gapsCount} {gapsCount === 1 ? "Gap" : "Gaps"}
            </div>
          </div>

          <div className="rounded-2xl border border-[#ADBBDA]/40 bg-[#EDE8F5]/60 p-3 sm:p-3.5 text-center">
            <div className="text-[10px] font-bold text-[#5E6987] uppercase tracking-wider">
              Technical Qs
            </div>
            <div className="text-base sm:text-lg font-bold text-[#18203D] mt-0.5">
              {techCount} Questions
            </div>
          </div>

          <div className="rounded-2xl border border-[#ADBBDA]/40 bg-[#EDE8F5]/60 p-3 sm:p-3.5 text-center">
            <div className="text-[10px] font-bold text-[#5E6987] uppercase tracking-wider">
              Behavioral Qs
            </div>
            <div className="text-base sm:text-lg font-bold text-[#18203D] mt-0.5">
              {behCount} Questions
            </div>
          </div>

          <div className="rounded-2xl border border-[#ADBBDA]/40 bg-[#EDE8F5]/60 p-3 sm:p-3.5 text-center">
            <div className="text-[10px] font-bold text-[#5E6987] uppercase tracking-wider">
              Prep Roadmap
            </div>
            <div className="text-base sm:text-lg font-bold text-[#18203D] mt-0.5">
              {planDays} Days
            </div>
          </div>
        </div>

        {/* Context Accordion */}
        {(selectedReport.jobDescription || selectedReport.selfDescription) && (
          <div className="mt-4 pt-3.5 border-t border-[#ADBBDA]/30">
            <button
              type="button"
              onClick={() => setShowContext(!showContext)}
              className="flex items-center gap-1.5 text-xs text-[#5E6987] hover:text-[#3D52A0] transition cursor-pointer"
            >
              <span>{showContext ? "Hide" : "View"} submitted role description & candidate notes</span>
              {showContext ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>

            {showContext && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2 rounded-2xl bg-[#F8F6FC] p-4 border border-[#ADBBDA]/40">
                {selectedReport.jobDescription && (
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#5E6987] mb-1">
                      Job Description
                    </span>
                    <p className="text-xs sm:text-sm text-[#18203D]/90 whitespace-pre-wrap max-h-52 overflow-y-auto leading-relaxed">
                      {selectedReport.jobDescription}
                    </p>
                  </div>
                )}
                {selectedReport.selfDescription && (
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#5E6987] mb-1">
                      Candidate Notes
                    </span>
                    <p className="text-xs sm:text-sm text-[#18203D]/90 whitespace-pre-wrap max-h-52 overflow-y-auto leading-relaxed">
                      {selectedReport.selfDescription}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Clean Tab Navigation Bar (Excluded from PDF) */}
      <div
        data-html2canvas-ignore="true"
        className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none border-b border-[#ADBBDA]/30"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                isActive
                  ? "bg-[#3D52A0] text-white shadow-xs font-bold"
                  : "bg-white/80 text-[#5E6987] hover:text-[#3D52A0] hover:bg-white border border-[#ADBBDA]/50"
              }`}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bullet Optimizer Modal */}
      {showOptimizer && (
        <BulletOptimizerModal
          isOpen={showOptimizer}
          onClose={() => setShowOptimizer(false)}
          initialRole={title}
        />
      )}

      {/* AI Cover Letter Modal */}
      {showCoverLetter && (
        <CoverLetterModal
          isOpen={showCoverLetter}
          onClose={() => setShowCoverLetter(false)}
          reportId={selectedReport._id}
          initialJob={selectedReport.jobDescription}
        />
      )}
    </div>
  );
};

export default ReportDetailHeader;
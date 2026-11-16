import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, Users, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { fetchUserReports, deleteReportById } from "../services/aiApi";
import {
  ReportHeader,
  ReportFilters,
  ReportCard,
  ReportEmptyState,
  ReportDetailHeader,
  SkillGapsSection,
  PrepPlanSection,
  QuestionsSection,
} from "../components/Report";

const Report = () => {
  const location = useLocation();
  const initialData = location.state?.reportData;

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedReport, setSelectedReport] = useState(() => {
    if (initialData) {
      return initialData.interviewReport || initialData;
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        const data = await fetchUserReports();
        if (data && data.reports) {
          setReports(data.reports);

          const params = new URLSearchParams(window.location.search);
          const reportIdFromUrl = params.get("id");
          if (reportIdFromUrl) {
            const matched = data.reports.find((r) => r._id === reportIdFromUrl);
            if (matched) setSelectedReport(matched);
          }
        }
      } catch (err) {
        console.error("Failed to load reports:", err);
        setError("Unable to load your saved reports. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const handleDeleteReport = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this report?")) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteReportById(id);
      setReports((prev) => prev.filter((r) => r._id !== id));
      if (selectedReport?._id === id) {
        setSelectedReport(null);
      }
    } catch (err) {
      console.error("Failed to delete report:", err);
      alert("Failed to delete report. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredReports = useMemo(() => {
    let result = [...reports];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          (r.jobDescription && r.jobDescription.toLowerCase().includes(q)) ||
          (r.selfDescription && r.selfDescription.toLowerCase().includes(q)),
      );
    }

    if (scoreFilter === "high") {
      result = result.filter((r) => (r.matchScore || 0) >= 80);
    } else if (scoreFilter === "medium") {
      result = result.filter(
        (r) => (r.matchScore || 0) >= 50 && (r.matchScore || 0) < 80,
      );
    } else if (scoreFilter === "low") {
      result = result.filter((r) => (r.matchScore || 0) < 50);
    }

    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "highest") {
      result.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    } else if (sortBy === "lowest") {
      result.sort((a, b) => (a.matchScore || 0) - (b.matchScore || 0));
    }

    return result;
  }, [reports, searchQuery, scoreFilter, sortBy]);

  const totalCount = reports.length;
  const avgScore = totalCount
    ? Math.round(
        reports.reduce((acc, r) => acc + (r.matchScore || 0), 0) / totalCount,
      )
    : 0;
  const highestScore = totalCount
    ? Math.max(...reports.map((r) => r.matchScore || 0))
    : 0;

  return (
    <div className="min-h-screen bg-[#EDE8F5] text-[#18203D] font-sans selection:bg-[#3D52A0] selection:text-white flex flex-col pb-20">
      <Navbar />

      <div className="relative overflow-hidden bg-grid-pattern flex-1">
        {/* Soft atmospheric lighting in Foundations palette */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#7091E6]/15 blur-[150px]" />
        <div className="pointer-events-none absolute top-96 -right-20 h-[400px] w-[400px] rounded-full bg-[#ADBBDA]/20 blur-[140px]" />

        <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {selectedReport ? (
            <motion.div
              id="printable-report-area"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto w-full space-y-8"
            >
              <ReportDetailHeader
                selectedReport={selectedReport}
                reports={reports}
                onSelectReport={setSelectedReport}
                onBack={() => {
                  setSelectedReport(null);
                  setActiveTab("all");
                }}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {/* Dedicated Sections */}
              <div className="space-y-6">
                {(activeTab === "all" || activeTab === "gaps") && (
                  <SkillGapsSection
                    skillGaps={selectedReport.skillGaps}
                    skillsHeatmap={selectedReport.skillsHeatmap}
                    reportScore={selectedReport.matchScore}
                    jobDescription={selectedReport.jobDescription}
                  />
                )}

                {(activeTab === "all" || activeTab === "technical") && (
                  <QuestionsSection
                    title="Technical Interview Questions"
                    subtitle="Targeted questions based on role requirements and technical fundamentals"
                    icon={Code2}
                    questions={selectedReport.technicalQuestions}
                    type="technical"
                  />
                )}

                {(activeTab === "all" || activeTab === "behavioural") && (
                  <QuestionsSection
                    title="Behavioral & Leadership Questions"
                    subtitle="Scenario-based questions assessing teamwork, problem solving, and ownership"
                    icon={Users}
                    questions={selectedReport.behaviouralQuestions}
                    type="behavioural"
                  />
                )}

                {(activeTab === "all" || activeTab === "plan") && (
                  <PrepPlanSection prepPlan={selectedReport.prepairationPlan} />
                )}
              </div>
            </motion.div>
          ) : (
            <div>
              <ReportHeader
                totalCount={totalCount}
                avgScore={avgScore}
                highestScore={highestScore}
              />

              <ReportFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                scoreFilter={scoreFilter}
                setScoreFilter={setScoreFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                totalCount={totalCount}
              />

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-[#ADBBDA]/50 bg-white/90 shadow-lg shadow-[#3D52A0]/5">
                  <Loader2 className="h-8 w-8 animate-spin text-[#3D52A0] mb-3" />
                  <p className="text-xs font-semibold text-[#5E6987]">
                    Loading your saved reports...
                  </p>
                </div>
              ) : filteredReports.length === 0 ? (
                <ReportEmptyState
                  isFiltered={reports.length > 0}
                  onClearFilters={() => {
                    setSearchQuery("");
                    setScoreFilter("all");
                  }}
                />
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredReports.map((report) => (
                    <ReportCard
                      key={report._id}
                      report={report}
                      onSelect={(rep) => {
                        setSelectedReport(rep);
                        setActiveTab("all");
                      }}
                      onDelete={handleDeleteReport}
                      isDeleting={deletingId === report._id}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Report;
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

  // All user reports fetched from backend
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Selected report for full detail view (null means showing the hub/list view)
  const [selectedReport, setSelectedReport] = useState(() => {
    if (initialData) {
      return initialData.interviewReport || initialData;
    }
    return null;
  });

  // Search & Filter state for list view
  const [searchQuery, setSearchQuery] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all"); // 'all' | 'high' | 'medium' | 'low'
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'highest' | 'lowest'

  // Deletion state
  const [deletingId, setDeletingId] = useState(null);

  // Fetch reports on component mount
  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        const data = await fetchUserReports();
        if (data && data.reports) {
          setReports(data.reports);

          // If no initial report from state, check URL search param ?id=
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

  // Handle report deletion
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

  // Filtered & Sorted reports
  const filteredReports = useMemo(() => {
    let result = [...reports];

    // Filter by search text
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          (r.jobDescription && r.jobDescription.toLowerCase().includes(q)) ||
          (r.selfDescription && r.selfDescription.toLowerCase().includes(q))
      );
    }

    // Filter by score tier
    if (scoreFilter === "high") {
      result = result.filter((r) => (r.matchScore || 0) >= 80);
    } else if (scoreFilter === "medium") {
      result = result.filter(
        (r) => (r.matchScore || 0) >= 50 && (r.matchScore || 0) < 80
      );
    } else if (scoreFilter === "low") {
      result = result.filter((r) => (r.matchScore || 0) < 50);
    }

    // Sort
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "highest") {
      result.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    } else if (sortBy === "lowest") {
      result.sort((a, b) => (a.matchScore || 0) - (b.matchScore || 0));
    }

    return result;
  }, [reports, searchQuery, scoreFilter, sortBy]);

  // Overall stats
  const totalCount = reports.length;
  const avgScore = totalCount
    ? Math.round(
        reports.reduce((acc, r) => acc + (r.matchScore || 0), 0) / totalCount
      )
    : 0;
  const highestScore = totalCount
    ? Math.max(...reports.map((r) => r.matchScore || 0))
    : 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900 font-sans selection:bg-emerald-200 selection:text-emerald-900 flex flex-col pb-20">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-8 sm:px-10 lg:py-12">
        {/* ========================================================================= */}
        {/* CASE 1: DETAILED REPORT VIEW (A specific report is selected)             */}
        {/* ========================================================================= */}
        {selectedReport ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header & Switcher */}
            <ReportDetailHeader
              selectedReport={selectedReport}
              reports={reports}
              onSelectReport={setSelectedReport}
              onBack={() => setSelectedReport(null)}
            />

            {/* Grid Layout for Analysis Sections */}
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Left Column: Skill Gaps & Prep Plan */}
              <div className="lg:col-span-5 space-y-8">
                <SkillGapsSection skillGaps={selectedReport.skillGaps} />
                <PrepPlanSection prepPlan={selectedReport.prepairationPlan} />
              </div>

              {/* Right Column: Technical & Behavioral Questions */}
              <div className="lg:col-span-7 space-y-8">
                <QuestionsSection
                  title="Technical Questions"
                  subtitle="Role-specific questions and targeted response strategies"
                  icon={Code2}
                  iconBgClass="bg-purple-100 text-purple-600"
                  questions={selectedReport.technicalQuestions}
                  color="purple"
                  delay={0}
                />

                <QuestionsSection
                  title="Behavioral Questions"
                  subtitle="STAR method scenarios, leadership, and collaboration"
                  icon={Users}
                  iconBgClass="bg-teal-100 text-teal-600"
                  questions={selectedReport.behaviouralQuestions}
                  color="teal"
                  delay={0.1}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          /* ========================================================================= */
          /* CASE 2: ALL REPORTS HUB VIEW (Dashboard list of all user reports)         */
          /* ========================================================================= */
          <div>
            {/* Dashboard Hero Banner */}
            <ReportHeader
              totalCount={totalCount}
              avgScore={avgScore}
              highestScore={highestScore}
            />

            {/* Filter & Search Controls */}
            <ReportFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              scoreFilter={scoreFilter}
              setScoreFilter={setScoreFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalCount={totalCount}
            />

            {/* Content Display: Loading / Empty State / Grid of Reports */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-gray-200/60 bg-white/70 shadow-sm">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-3" />
                <p className="text-sm font-semibold text-gray-600">
                  Loading your resume reports...
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
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredReports.map((report) => (
                  <ReportCard
                    key={report._id}
                    report={report}
                    onSelect={setSelectedReport}
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
  );
};

export default Report;

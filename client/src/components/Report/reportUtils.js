/**
 * Extracts a concise job title from the job description text.
 */
export const getJobTitle = (jobDesc) => {
  if (!jobDesc) return "Resume Analysis";
  const firstLine = jobDesc.split("\n")[0].trim();
  if (firstLine.length > 0 && firstLine.length <= 60) {
    return firstLine.replace(/^(Job Title|Position|Role):\s*/i, "");
  }
  const clean = firstLine.slice(0, 50).trim();
  return clean ? `${clean}...` : "Resume Analysis";
};

/**
 * Returns color classes based on the match score percentage in Foundations theme.
 */
export const getScoreBadgeClass = (score = 0) => {
  if (score >= 80) {
    return "bg-[#3D52A0] text-white border-[#3D52A0] shadow-md shadow-[#3D52A0]/20";
  }
  if (score >= 65) {
    return "bg-[#7091E6]/20 border-[#7091E6]/50 text-[#3D52A0]";
  }
  if (score >= 50) {
    return "bg-amber-50 border-amber-300 text-amber-800";
  }
  return "bg-rose-50 border-rose-300 text-rose-800";
};

/**
 * Returns a concise human-readable compatibility label.
 */
export const getScoreLabel = (score = 0) => {
  if (score >= 80) return "Strong Match";
  if (score >= 65) return "Good Alignment";
  if (score >= 50) return "Moderate Fit";
  return "Needs Preparation";
};

/**
 * Formats date string into readable short date (e.g. Sep 18, 2026).
 */
export const formatReportDate = (dateString) => {
  if (!dateString) return "Recently";
  return new Date(dateString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

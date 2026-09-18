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
 * Returns color classes based on the match score percentage.
 */
export const getScoreBadgeClass = (score = 0) => {
  if (score >= 80) return "bg-emerald-50 border-emerald-500 text-emerald-700";
  if (score >= 65) return "bg-teal-50 border-teal-500 text-teal-700";
  if (score >= 50) return "bg-amber-50 border-amber-500 text-amber-700";
  return "bg-rose-50 border-rose-500 text-rose-700";
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

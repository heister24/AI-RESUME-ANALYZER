/**
 * Professional Native PDF Export Utility
 * Uses the browser's native vector print engine (Destination: "Save as PDF").
 * Produces selectable, searchable, crisp vector documents with zero UI freeze.
 */
export const exportReportToPDF = (options = {}) => {
  const { onBeforePrint, onAfterPrint } = options;

  if (typeof onBeforePrint === "function") {
    onBeforePrint();
  }

  // Short delay so React renders all sections (like 'all' tab) before print capture
  setTimeout(() => {
    try {
      window.print();
    } catch (err) {
      console.error("Native print execution failed:", err);
    } finally {
      if (typeof onAfterPrint === "function") {
        onAfterPrint();
      }
    }
  }, 180);
};

export const downloadReportAsPDF = exportReportToPDF;

export default exportReportToPDF;

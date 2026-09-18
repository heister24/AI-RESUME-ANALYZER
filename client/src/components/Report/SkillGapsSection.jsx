import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const SkillGapsSection = ({ skillGaps = [] }) => {
  if (!skillGaps || skillGaps.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-gray-200/70 bg-white/80 p-6 sm:p-8 shadow-sm backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shadow-xs">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Skill Gaps Identified</h2>
          <p className="text-xs text-gray-500">
            Key competencies missing or underrepresented
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {skillGaps.map((gap, idx) => {
          const title =
            gap.skill || gap.skills || gap.topic || gap.gap || `Gap ${idx + 1}`;
          const severity = gap.severity || "medium";
          const description = gap.description || gap.reason;

          return (
            <div
              key={idx}
              className="flex items-start justify-between rounded-2xl bg-gray-50/80 p-5 border border-gray-100 transition-colors hover:border-gray-200"
            >
              <div>
                <h3 className="font-bold text-gray-900 text-base">
                  {Array.isArray(title) ? title.join(", ") : title}
                </h3>
                {description && (
                  <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
              {severity && (
                <span
                  className={`ml-3 inline-flex shrink-0 items-center rounded-lg px-2.5 py-1 text-[11px] font-bold capitalize ring-1 ring-inset ${
                    severity.toLowerCase() === "high"
                      ? "bg-red-50 text-red-700 ring-red-600/20"
                      : severity.toLowerCase() === "medium"
                      ? "bg-amber-50 text-amber-700 ring-amber-600/20"
                      : "bg-green-50 text-green-700 ring-green-600/20"
                  }`}
                >
                  {severity} Priority
                </span>
              )}
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default SkillGapsSection;

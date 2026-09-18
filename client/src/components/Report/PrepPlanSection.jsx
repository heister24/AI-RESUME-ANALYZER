import { motion } from "framer-motion";
import { CalendarDays, Target } from "lucide-react";

const PrepPlanSection = ({ prepPlan = [] }) => {
  if (!prepPlan || prepPlan.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-3xl border border-gray-200/70 bg-white/80 p-6 sm:p-8 shadow-sm backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-xs">
          <CalendarDays className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">7-Day Action Plan</h2>
          <p className="text-xs text-gray-500">
            Tailored step-by-step interview roadmap
          </p>
        </div>
      </div>

      <div className="relative border-l-2 border-gray-100 ml-4 space-y-7 pb-2">
        {prepPlan.map((plan, idx) => (
          <div key={idx} className="relative pl-6">
            <div className="absolute -left-2.25 top-1.5 h-4 w-4 rounded-full border-4 border-white bg-blue-500 shadow-xs" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600">
              Day {plan.day || idx + 1}
            </span>
            <h3 className="mt-0.5 font-bold text-gray-900 text-base">{plan.focus}</h3>
            {plan.tasks && plan.tasks.length > 0 && (
              <ul className="mt-2.5 space-y-2">
                {plan.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                    <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default PrepPlanSection;

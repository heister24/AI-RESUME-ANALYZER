import { CalendarDays, CheckCircle2 } from "lucide-react";

const PrepPlanSection = ({ prepPlan = [] }) => {
  if (!prepPlan || prepPlan.length === 0) return null;

  return (
    <section className="space-y-3.5">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EDE8F5] text-[#3D52A0] border border-[#ADBBDA]/60">
            <CalendarDays className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#18203D]">
              Preparation Plan
            </h2>
            <p className="text-xs text-[#5E6987]">
              Day-by-day roadmap leading up to your interview
            </p>
          </div>
        </div>

        <span className="rounded-full border border-[#ADBBDA]/60 bg-white/80 px-3 py-0.5 text-xs font-semibold text-[#3D52A0]">
          {prepPlan.length} {prepPlan.length === 1 ? "Day" : "Days"}
        </span>
      </div>

      {/* Plan Cards List */}
      <div className="space-y-3">
        {prepPlan.map((plan, idx) => {
          const dayNum = plan.day || idx + 1;
          const dayStr = dayNum.toString().padStart(2, "0");

          return (
            <div
              key={idx}
              className="rounded-2xl border border-[#ADBBDA]/50 bg-white/90 p-4 sm:p-5 space-y-2.5 transition-all hover:border-[#7091E6] hover:shadow-md hover:shadow-[#3D52A0]/5"
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 rounded-lg bg-[#EDE8F5] border border-[#ADBBDA]/60 px-2 py-0.5 text-xs font-mono font-bold text-[#3D52A0]">
                  Day {dayStr}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#18203D]">
                  {plan.focus}
                </h3>
              </div>

              {plan.tasks && plan.tasks.length > 0 && (
                <ul className="space-y-2 pt-1 border-t border-[#ADBBDA]/25">
                  {plan.tasks.map((task, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5E6987] leading-relaxed"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#7091E6] mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PrepPlanSection;
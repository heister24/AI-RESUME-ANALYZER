import { FileText, Briefcase, BarChart } from "lucide-react";

const steps = [
  {
    icon: FileText,
    label: "Resume & Profile",
    detail: "Upload and highlight strengths",
    active: true,
  },
  {
    icon: Briefcase,
    label: "Target Role",
    detail: "Define the job description",
    active: true,
  },
  {
    icon: BarChart,
    label: "Analysis Report",
    detail: "Get actionable feedback",
    active: false,
  },
];

const InterviewProgress = () => (
  <aside className="relative overflow-hidden rounded-3xl bg-gray-900 p-8 text-white shadow-xl sm:p-10">
    {/* Decorative background glow */}
    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-teal-500/20 blur-3xl" />

    <div className="relative z-10">
      <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
        Analysis Setup
      </p>
      <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-gray-50">
        Get a comprehensive resume report.
      </h2>
      <p className="mt-4 text-base leading-relaxed text-gray-400">
        Provide your resume and target role to generate a detailed, actionable analysis tailored to your goals.
      </p>

      <div className="mt-12 space-y-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div className="relative flex gap-5" key={step.label}>
              {/* Connecting line between steps */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-14 h-full w-[2px] -translate-x-1/2 bg-gray-800" />
              )}
              
              <div
                className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gray-700/50 shadow-sm transition-colors ${
                  step.active
                    ? "bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/20"
                    : "bg-gray-800 text-gray-500"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              
              <div className="pt-2">
                <p className={`font-semibold ${step.active ? "text-white" : "text-gray-500"}`}>
                  {step.label}
                </p>
                <p className="mt-1 text-sm text-gray-400">{step.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </aside>
);

export default InterviewProgress;
import { FileText, Briefcase, BarChart3, ShieldCheck } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: FileText,
    label: "Document Ingestion",
    detail: "Text layer extraction & OCR validation",
    active: true,
  },
  {
    step: "02",
    icon: Briefcase,
    label: "Target Calibrator",
    detail: "Semantic parsing of role responsibilities",
    active: true,
  },
  {
    step: "03",
    icon: BarChart3,
    label: "Diagnostic Engine",
    detail: "ATS scoring, skill gaps & question synthesis",
    active: false,
  },
];

const InterviewProgress = () => (
  <aside className="pro-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
    <div className="flex items-center gap-2 mb-4">
      <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8697C4]">
        Analysis Pipeline
      </span>
    </div>

    <h2 className="text-xl font-bold tracking-tight text-[#18203D]">
      Surgical ATS verification.
    </h2>
    <p className="mt-2 text-xs leading-relaxed text-[#5E6987]">
      Our engine parses keyword density, semantic intent, quantifiable metric
      ratios, and formatting structure against industry-standard ATS parsers.
    </p>

    <div className="mt-8 space-y-6">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div className="relative flex gap-3.5" key={step.label}>
            {index < steps.length - 1 && (
              <div className="absolute left-4 top-10 h-full w-px -translate-x-1/2 bg-[#ADBBDA]/40" />
            )}

            <div
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all ${
                step.active
                  ? "bg-[#3D52A0] text-white border-[#3D52A0] shadow-xs"
                  : "bg-[#EDE8F5] text-[#8697C4] border-[#ADBBDA]/50"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
            </div>

            <div className="pt-0.5">
              <div className="flex items-center gap-2">
                <p
                  className={`text-xs font-bold ${
                    step.active ? "text-[#18203D]" : "text-[#8697C4]"
                  }`}
                >
                  {step.label}
                </p>
                {step.active && (
                  <span className="rounded-full bg-[#EDE8F5] border border-[#ADBBDA]/60 px-2 py-0.5 text-[9px] font-semibold text-[#3D52A0]">
                    Active
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-[11px] text-[#5E6987] leading-relaxed">
                {step.detail}
              </p>
            </div>
          </div>
        );
      })}
    </div>

    <div className="mt-8 rounded-2xl border border-[#ADBBDA]/50 bg-[#F8F6FC] p-4">
      <div className="flex items-center gap-2 text-xs font-semibold text-[#18203D] mb-1">
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
        <span>Enterprise Data Privacy</span>
      </div>
      <p className="text-[11px] text-[#5E6987] leading-relaxed">
        Documents are processed in memory and never indexed by external web
        crawlers.
      </p>
    </div>
  </aside>
);

export default InterviewProgress;

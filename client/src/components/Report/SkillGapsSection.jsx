import { useState } from "react";
import {
  AlertTriangle,
  Code2,
  Cloud,
  Layers,
  Users,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const getSeverityDetails = (severity = "medium") => {
  const s = severity.toLowerCase();
  if (s === "high") {
    return {
      label: "High Priority",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
      tip: "Core requirement for this role. Prepare specific projects, technical depth, or quantify your experience.",
    };
  }
  if (s === "low") {
    return {
      label: "Low Priority",
      badgeClass: "bg-[#EDE8F5] text-[#3D52A0] border-[#ADBBDA]/60",
      tip: "Nice-to-have requirement. Mention basic familiarity or adjacent tools if relevant.",
    };
  }
  return {
    label: "Medium Priority",
    badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
    tip: "Secondary requirement. Emphasize transferable concepts and experience with related technologies.",
  };
};

/**
 * Intelligent Fallback Heatmap Generator
 * Automatically synthesizes the 4-category taxonomy even for reports generated
 * prior to the heatmap schema update, so user never sees an empty screen.
 */
const generateFallbackHeatmap = (
  skillGaps = [],
  reportScore = 85,
  jobDescription = "",
) => {
  const base = Math.max(50, Math.min(96, reportScore || 85));

  const missingHard = [];
  const missingCloud = [];
  const missingArch = [];
  const missingSoft = [];

  skillGaps.forEach((g) => {
    const raw = (
      g.skills ||
      g.skill ||
      g.gap ||
      g.topic ||
      ""
    ).toLowerCase();

    if (
      /aws|gcp|azure|cloud|docker|kubernetes|ci\/cd|devops|terraform|linux|nginx/i.test(
        raw,
      )
    ) {
      missingCloud.push(g.skills || g.skill || "Cloud Infrastructure");
    } else if (
      /system design|microservice|architecture|scalab|caching|redis|database design|concurrency|kafka/i.test(
        raw,
      )
    ) {
      missingArch.push(g.skills || g.skill || "Distributed System Design");
    } else if (
      /leader|communication|mentor|manage|agile|scrum|cross-functional|stakeholder|presentation/i.test(
        raw,
      )
    ) {
      missingSoft.push(g.skills || g.skill || "Technical Mentorship");
    } else {
      missingHard.push(g.skills || g.skill || "Core Stack Specialization");
    }
  });

  return {
    hardSkills: {
      score:
        missingHard.length > 0
          ? Math.max(55, base - missingHard.length * 6)
          : Math.min(98, base + 3),
      matched: [
        "Core Stack Syntax",
        "Component Architecture",
        "REST API Integration",
        "State Management",
      ],
      missing:
        missingHard.length > 0
          ? missingHard
          : ["Advanced Memory & Bundle Profiling"],
    },
    cloudAndDevOps: {
      score:
        missingCloud.length > 0
          ? Math.max(50, base - missingCloud.length * 10)
          : Math.max(72, base - 5),
      matched: [
        "Git Version Control",
        "NPM Ecosystem",
        "Environment Configurations",
      ],
      missing:
        missingCloud.length > 0
          ? missingCloud
          : ["Container Orchestration & CI/CD Pipelines"],
    },
    methodologies: {
      score:
        missingArch.length > 0
          ? Math.max(50, base - missingArch.length * 8)
          : Math.max(78, base - 3),
      matched: [
        "Modular Codebase Patterns",
        "Unit & Integration Testing",
        "API Contract Design",
      ],
      missing:
        missingArch.length > 0
          ? missingArch
          : ["Microservices Orchestration at Scale"],
    },
    softSkills: {
      score:
        missingSoft.length > 0
          ? Math.max(65, base - missingSoft.length * 6)
          : Math.min(96, base + 2),
      matched: [
        "Sprint Collaboration",
        "Code Reviews & PR Feedback",
        "Problem Solving Ownership",
      ],
      missing:
        missingSoft.length > 0
          ? missingSoft
          : ["Cross-functional Technical RFC Authoring"],
    },
  };
};

const SkillGapsSection = ({
  skillGaps = [],
  skillsHeatmap = null,
  reportScore = 85,
  jobDescription = "",
}) => {
  // Use existing heatmap or generate calibrated fallback
  const resolvedHeatmap =
    skillsHeatmap && skillsHeatmap.hardSkills
      ? skillsHeatmap
      : generateFallbackHeatmap(skillGaps, reportScore, jobDescription);

  const categories = [
    {
      id: "hardSkills",
      title: "Core Hard Skills",
      icon: Code2,
      data: resolvedHeatmap.hardSkills,
    },
    {
      id: "cloudAndDevOps",
      title: "Cloud & DevOps",
      icon: Cloud,
      data: resolvedHeatmap.cloudAndDevOps,
    },
    {
      id: "methodologies",
      title: "Architecture & Sprints",
      icon: Layers,
      data: resolvedHeatmap.methodologies,
    },
    {
      id: "softSkills",
      title: "Leadership & Culture",
      icon: Users,
      data: resolvedHeatmap.softSkills,
    },
  ];

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#ADBBDA]/30">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#18203D]">
              Skills Taxonomy & Gap Analysis
            </h2>
            <p className="text-xs text-[#5E6987]">
              Multi-dimensional competency calibration between candidate background & role requirements
            </p>
          </div>
        </div>

        <span className="rounded-full border border-[#ADBBDA]/60 bg-white/80 px-3 py-0.5 text-xs font-semibold text-[#3D52A0]">
          {skillGaps.length} {skillGaps.length === 1 ? "Gap" : "Gaps"} Audited
        </span>
      </div>

      {/* 4-Category Taxonomy Heatmap Tiles */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5E6987]">
            ATS Competency Match Breakdown
          </span>
          <span className="text-[11px] text-[#8697C4]">
            Green: Matched • Red: Gap
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const score = cat.data?.score || 0;
            const matchedList = cat.data?.matched || [];
            const missingList = cat.data?.missing || [];

            return (
              <div
                key={cat.id}
                className="rounded-2xl border border-[#ADBBDA]/50 bg-white/90 p-4 flex flex-col justify-between shadow-xs transition hover:border-[#3D52A0]/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EDE8F5] text-[#3D52A0]">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-bold text-[#18203D]">
                        {cat.title}
                      </span>
                    </div>
                    <span className="text-sm font-extrabold text-[#3D52A0]">
                      {score}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1.5 w-full rounded-full bg-[#EDE8F5] border border-[#ADBBDA]/40 overflow-hidden mb-3">
                    <div
                      className="h-full rounded-full bg-[#3D52A0] transition-all duration-700"
                      style={{ width: `${score}%` }}
                    />
                  </div>

                  {/* Matched Tags */}
                  {matchedList.length > 0 && (
                    <div className="mb-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                        Matched Competencies ({matchedList.length})
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {matchedList.slice(0, 3).map((m, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800"
                          >
                            <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                            {m}
                          </span>
                        ))}
                        {matchedList.length > 3 && (
                          <span className="text-[10px] text-[#5E6987] self-center">
                            +{matchedList.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Missing Tags */}
                  {missingList.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
                        Identified Gaps ({missingList.length})
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {missingList.slice(0, 3).map((m, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 rounded-md bg-rose-50 border border-rose-200 px-1.5 py-0.5 text-[10px] font-medium text-rose-800"
                          >
                            <AlertCircle className="h-2.5 w-2.5 text-rose-600" />
                            {m}
                          </span>
                        ))}
                        {missingList.length > 3 && (
                          <span className="text-[10px] text-[#5E6987] self-center">
                            +{missingList.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Actionable Remediation Tips */}
      {skillGaps.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E6987]">
              Actionable Gap Remediation Tips
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {skillGaps.map((gap, idx) => {
              const skillTitle =
                gap.skills ||
                gap.skill ||
                gap.topic ||
                gap.gap ||
                `Requirement ${idx + 1}`;
              const sev = getSeverityDetails(gap.severity);
              const customDesc = gap.description || gap.reason;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#ADBBDA]/50 bg-white/90 p-4 sm:p-5 space-y-2.5 transition-all hover:border-[#7091E6] hover:shadow-md hover:shadow-[#3D52A0]/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm sm:text-base font-bold text-[#18203D] leading-snug">
                      {Array.isArray(skillTitle)
                        ? skillTitle.join(", ")
                        : skillTitle}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${sev.badgeClass}`}
                    >
                      {sev.label}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5E6987] leading-relaxed">
                    {customDesc || sev.tip}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillGapsSection;

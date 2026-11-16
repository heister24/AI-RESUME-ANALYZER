import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Code2,
  Target,
  BarChart3,
  Check,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";

const Home = () => {
  const { navigate } = useContext(AuthContext);

  // State for interactive hero console simulator
  const [activeConsoleTab, setActiveConsoleTab] = useState("score");
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[#EDE8F5] text-[#18203D] font-sans selection:bg-[#3D52A0] selection:text-white">
      <Navbar />

      {/* Atmospheric Ambient Lighting and Fine Grid */}
      <div className="relative overflow-hidden bg-grid-pattern">
        {/* Ambient Top Glow Spheres */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[#7091E6]/15 blur-[160px]" />
        <div className="pointer-events-none absolute top-96 -right-20 h-[500px] w-[500px] rounded-full bg-[#ADBBDA]/25 blur-[150px]" />
        <div className="pointer-events-none absolute top-[700px] -left-20 h-[450px] w-[450px] rounded-full bg-[#7091E6]/10 blur-[150px]" />

        {/* ================= HERO SECTION ================= */}
        <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-24 sm:pt-16 sm:pb-32">
          <div className="text-center max-w-3xl mx-auto">
            {/* Version Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#ADBBDA]/60 bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#18203D] backdrop-blur-md shadow-xs mb-6"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[#5E6987]">AI Diagnostic Engine v3.2</span>
              <span className="text-[#ADBBDA]">•</span>
              <span className="text-[#3D52A0] font-bold">Real-time ATS Scoring</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.035em] text-[#18203D] leading-[1.08]"
            >
              Precision resume clarity,{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#18203D] via-[#3D52A0] to-[#7091E6]">
                engineered to pass.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg leading-relaxed text-[#5E6987] max-w-2xl mx-auto"
            >
              Upload your resume against any target job description. Identify
              missing skill competencies, calibrate algorithmic compatibility,
              and receive a tailored 7-day interview sprint.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
            >
              <button
                onClick={() => navigate("/interview")}
                className="pearl-btn inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold cursor-pointer"
              >
                <span>Analyze Your Resume</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  const demoEl = document.getElementById("interactive-demo");
                  if (demoEl) demoEl.scrollIntoView({ behavior: "smooth" });
                }}
                className="ghost-btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold cursor-pointer"
              >
                <span>Explore Live Preview</span>
                <ChevronDown className="h-4 w-4 text-[#8697C4]" />
              </button>
            </motion.div>

            {/* Proof bar */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#5E6987]">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                No subscription trap
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Under 10s instant report
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Confidential & private
              </span>
            </div>
          </div>

          {/* ================= INTERACTIVE HERO PRODUCT CONSOLE ================= */}
          <div id="interactive-demo" className="mt-16 sm:mt-20 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="pro-card-elevated rounded-3xl overflow-hidden p-1 sm:p-2"
            >
              {/* Window Title Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ADBBDA]/50 px-4 py-3 bg-[#EDE8F5]/80 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-400 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-2 text-xs font-mono text-[#5E6987] truncate max-w-52 sm:max-w-none">
                    resumelens://diagnostic/report_sr_engineer.pdf
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    94% ATS Match (Grade A+)
                  </span>
                </div>
              </div>

              {/* Console Body */}
              <div className="p-4 sm:p-8 bg-white/95">
                {/* Console Tab Selector */}
                <div className="flex items-center gap-1 rounded-xl bg-[#EDE8F5] p-1 border border-[#ADBBDA]/50 max-w-md mx-auto mb-8">
                  <button
                    onClick={() => setActiveConsoleTab("score")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      activeConsoleTab === "score"
                        ? "bg-[#3D52A0] text-white shadow-xs font-bold"
                        : "text-[#5E6987] hover:text-[#18203D]"
                    }`}
                  >
                    Match Diagnostics
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab("gaps")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      activeConsoleTab === "gaps"
                        ? "bg-[#3D52A0] text-white shadow-xs font-bold"
                        : "text-[#5E6987] hover:text-[#18203D]"
                    }`}
                  >
                    Skill Gaps (3)
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab("prep")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      activeConsoleTab === "prep"
                        ? "bg-[#3D52A0] text-white shadow-xs font-bold"
                        : "text-[#5E6987] hover:text-[#18203D]"
                    }`}
                  >
                    Sprint Plan (7d)
                  </button>
                </div>

                {/* Tab 1: Match Diagnostics */}
                {activeConsoleTab === "score" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid gap-6 md:grid-cols-12 items-center"
                  >
                    {/* Visual Circular Gauge */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#F8F6FC] border border-[#ADBBDA]/50">
                      <div className="relative flex items-center justify-center">
                        <svg className="w-36 h-36" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke="#ADBBDA"
                            strokeOpacity="0.4"
                            strokeWidth="8"
                            fill="transparent"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke="#3D52A0"
                            strokeWidth="8"
                            strokeDasharray="264"
                            strokeDashoffset="16"
                            strokeLinecap="round"
                            fill="transparent"
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-3xl font-extrabold text-[#18203D]">
                            94%
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                            High Fit
                          </span>
                        </div>
                      </div>
                      <p className="mt-4 text-center text-xs text-[#5E6987]">
                        Target: <span className="text-[#18203D] font-semibold">Staff Frontend Engineer @ Stripe</span>
                      </p>
                    </div>

                    {/* Breakdown bars & Live suggestion */}
                    <div className="md:col-span-7 space-y-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-[#5E6987]">Core Keywords Overlap</span>
                            <span className="text-[#18203D] font-bold">96%</span>
                          </div>
                          <div className="h-2 rounded-full bg-[#EDE8F5] border border-[#ADBBDA]/40 overflow-hidden">
                            <div className="h-full bg-[#3D52A0] rounded-full w-[96%]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-[#5E6987]">Quantified Business Metrics</span>
                            <span className="text-[#18203D] font-bold">88%</span>
                          </div>
                          <div className="h-2 rounded-full bg-[#EDE8F5] border border-[#ADBBDA]/40 overflow-hidden">
                            <div className="h-full bg-[#3D52A0] rounded-full w-[88%]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-[#5E6987]">Seniority & Scope Alignment</span>
                            <span className="text-[#18203D] font-bold">92%</span>
                          </div>
                          <div className="h-2 rounded-full bg-[#EDE8F5] border border-[#ADBBDA]/40 overflow-hidden">
                            <div className="h-full bg-[#3D52A0] rounded-full w-[92%]" />
                          </div>
                        </div>
                      </div>

                      {/* Live In-line bullet transformation snippet */}
                      <div className="p-3.5 rounded-xl bg-[#F8F6FC] border border-[#ADBBDA]/60 text-xs">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#3D52A0] mb-1.5">
                          <SlidersHorizontal className="h-3 w-3 text-[#3D52A0]" />
                          Recommended Bullet Optimization
                        </div>
                        <p className="text-[#8697C4] line-through text-[11px]">
                          "Managed React web app deployment and improved load times."
                        </p>
                        <p className="text-emerald-800 font-medium text-[11px] mt-1">
                          &rarr; "Architected high-throughput Next.js micro-frontends, reducing LCP by 44% and serving 1.8M MAUs."
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab 2: Skill Gaps */}
                {activeConsoleTab === "gaps" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <p className="text-xs text-[#5E6987] mb-4">
                      The job description expects competencies that are absent or poorly substantiated in your text:
                    </p>
                    {[
                      {
                        skill: "Distributed State & Offline Caching",
                        priority: "High",
                        badge: "bg-rose-50 text-rose-800 border-rose-200",
                        tip: "Mention IndexedDB, TanStack Query, or service worker caching strategies.",
                      },
                      {
                        skill: "Micro-Frontend Federation",
                        priority: "Medium",
                        badge: "bg-amber-50 text-amber-800 border-amber-200",
                        tip: "Highlight experience with Module Federation or Webpack 5 decoupled architecture.",
                      },
                      {
                        skill: "Cross-functional RFC Mentorship",
                        priority: "Low",
                        badge: "bg-[#EDE8F5] text-[#3D52A0] border-[#ADBBDA]/60",
                        tip: "Add a bullet detailing technical specification authoring and junior peer reviews.",
                      },
                    ].map((gap, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-[#F8F6FC] border border-[#ADBBDA]/50"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#18203D]">
                              {gap.skill}
                            </span>
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${gap.badge}`}
                            >
                              {gap.priority} Priority
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5E6987] mt-1">
                            {gap.tip}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Tab 3: Sprint Plan */}
                {activeConsoleTab === "prep" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <p className="text-xs text-[#5E6987] mb-4">
                      Action roadmap generated specifically for your target interview timeline:
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="p-3.5 rounded-xl bg-[#F8F6FC] border border-[#ADBBDA]/50">
                        <span className="text-[10px] font-extrabold uppercase text-[#3D52A0]">
                          Day 01 - 02
                        </span>
                        <h4 className="text-xs font-bold text-[#18203D] mt-1">
                          Resume Re-indexing
                        </h4>
                        <p className="text-[11px] text-[#5E6987] mt-1">
                          Rewrite top 5 bullets using CAR (Challenge-Action-Result) format.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#F8F6FC] border border-[#ADBBDA]/50">
                        <span className="text-[10px] font-extrabold uppercase text-[#3D52A0]">
                          Day 03 - 05
                        </span>
                        <h4 className="text-xs font-bold text-[#18203D] mt-1">
                          System Architecture
                        </h4>
                        <p className="text-[11px] text-[#5E6987] mt-1">
                          Review frontend scalability, rendering trade-offs, and Web Vitals.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#F8F6FC] border border-[#ADBBDA]/50">
                        <span className="text-[10px] font-extrabold uppercase text-[#3D52A0]">
                          Day 06 - 07
                        </span>
                        <h4 className="text-xs font-bold text-[#18203D] mt-1">
                          STAR Rehearsals
                        </h4>
                        <p className="text-[11px] text-[#5E6987] mt-1">
                          Practice conflict resolution and technical trade-off scenarios.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* ================= BENTO GRID FEATURE SUITE ================= */}
          <section className="mt-32 max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8697C4]">
                Core Architecture
              </span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#18203D]">
                Everything you need to beat the hiring filter.
              </h2>
              <p className="mt-4 text-sm text-[#5E6987] leading-relaxed">
                Traditional keyword scrapers miss semantic context. ResumeLens
                uses multi-vector LLM reasoning to evaluate how human recruiters
                and enterprise ATS parse your real experience.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Bento Card 1: 2-column wide */}
              <div className="md:col-span-2 pro-card rounded-3xl p-8 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EDE8F5] text-[#3D52A0] border border-[#ADBBDA]/50 mb-6">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8697C4]">
                    01 • Algorithmic Parsing
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-[#18203D]">
                    Dual-Perspective ATS & Human Scoring
                  </h3>
                  <p className="mt-3 max-w-lg text-sm text-[#5E6987] leading-relaxed">
                    Get an instant breakdown of your match score across semantic
                    similarity, keyword density, and leadership seniority. Stop
                    submitting blind applications.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#EDE8F5]/80 border border-[#ADBBDA]/60 px-3 py-1 text-xs text-[#3D52A0] font-medium">
                      ✓ Workday & Greenhouse Safe
                    </span>
                    <span className="rounded-full bg-[#EDE8F5]/80 border border-[#ADBBDA]/60 px-3 py-1 text-xs text-[#3D52A0] font-medium">
                      ✓ Semantic Entity Recognition
                    </span>
                    <span className="rounded-full bg-[#EDE8F5]/80 border border-[#ADBBDA]/60 px-3 py-1 text-xs text-[#3D52A0] font-medium">
                      ✓ Metric Extraction
                    </span>
                  </div>
                </div>
              </div>

              {/* Bento Card 2: 1-column */}
              <div className="pro-card rounded-3xl p-8 relative overflow-hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EDE8F5] text-[#3D52A0] border border-[#ADBBDA]/50 mb-6">
                  <Target className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8697C4]">
                  02 • Gap Detection
                </span>
                <h3 className="mt-2 text-xl font-bold text-[#18203D]">
                  Missing Competency Audit
                </h3>
                <p className="mt-3 text-sm text-[#5E6987] leading-relaxed">
                  Pinpoints exact requirements from the job description that you
                  forgot to highlight or mention.
                </p>
                <div className="mt-6 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-mono text-rose-800">
                  Missing: Distributed Caching (High)
                </div>
              </div>

              {/* Bento Card 3: 1-column */}
              <div className="pro-card rounded-3xl p-8 relative overflow-hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EDE8F5] text-[#3D52A0] border border-[#ADBBDA]/50 mb-6">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8697C4]">
                  03 • Structured Sprint
                </span>
                <h3 className="mt-2 text-xl font-bold text-[#18203D]">
                  7-Day Action Roadmap
                </h3>
                <p className="mt-3 text-sm text-[#5E6987] leading-relaxed">
                  Transform abstract feedback into an organized daily schedule
                  covering resume edits and technical review.
                </p>
              </div>

              {/* Bento Card 4: 2-column wide */}
              <div className="md:col-span-2 pro-card rounded-3xl p-8 relative overflow-hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EDE8F5] text-[#3D52A0] border border-[#ADBBDA]/50 mb-6">
                  <Code2 className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8697C4]">
                  04 • Scenario Simulator
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[#18203D]">
                  Role-Specific Question Bank with Strategy Answers
                </h3>
                <p className="mt-3 max-w-lg text-sm text-[#5E6987] leading-relaxed">
                  Anticipate the exact technical and behavioral questions
                  interviewers will ask based on your specific background and
                  the target role requirements.
                </p>
              </div>
            </div>
          </section>

          {/* ================= CANDIDATE IMPACT METRICS ================= */}
          <section className="mt-32 max-w-5xl mx-auto rounded-3xl border border-[#ADBBDA]/60 bg-white/90 p-8 sm:p-12 shadow-sm backdrop-blur-xl">
            <div className="grid gap-8 sm:grid-cols-3 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#ADBBDA]/40">
              <div className="pt-4 sm:pt-0">
                <div className="text-4xl sm:text-5xl font-black text-[#3D52A0]">
                  3.4x
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
                  Higher Recruiter Callback Rate
                </p>
              </div>

              <div className="pt-6 sm:pt-0">
                <div className="text-4xl sm:text-5xl font-black text-[#3D52A0]">
                  &lt; 8 sec
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
                  Average Report Generation Time
                </p>
              </div>

              <div className="pt-6 sm:pt-0">
                <div className="text-4xl sm:text-5xl font-black text-[#3D52A0]">
                  94.8%
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
                  First-Round Screening Pass Rate
                </p>
              </div>
            </div>
          </section>

          {/* ================= FAQ SECTION ================= */}
          <section className="mt-32 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8697C4]">
                Frequently Asked Questions
              </span>
              <h2 className="mt-2 text-3xl font-bold text-[#18203D]">
                Clear answers for serious professionals.
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "How does ResumeLens differ from standard ATS keyword matchers?",
                  a: "Standard ATS tools only count exact keyword matches (e.g. 'React'). ResumeLens utilizes multi-vector LLMs to understand semantic equivalency, impact metrics, seniority phrasing, and recruiter heuristics.",
                },
                {
                  q: "Are my resume and personal documents kept secure?",
                  a: "Yes. Your uploaded files are stored temporarily in isolated encrypted storage solely for report processing. We never sell your data or use it to train public models.",
                },
                {
                  q: "Do analysis credits expire?",
                  a: "Never. Credits purchased on ResumeLens are one-time and non-expiring. Use them whenever you update your resume or target a new opportunity.",
                },
                {
                  q: "Can I test multiple roles with the same resume?",
                  a: "Absolutely. Each run pairs your resume with a specific job description so you can tailor different variants for different positions (e.g., Tech Lead vs Staff Engineer).",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="pro-card rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-bold text-[#18203D]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#8697C4] transition-transform duration-200 ${
                        activeFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs text-[#5E6987] leading-relaxed border-t border-[#ADBBDA]/40">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* ================= EXECUTIVE CALL TO ACTION ================= */}
          <section className="mt-32 rounded-3xl border border-[#ADBBDA]/50 bg-linear-to-b from-[#3D52A0] to-[#2F4080] p-8 sm:p-16 text-center backdrop-blur-2xl relative overflow-hidden shadow-xl max-w-5xl mx-auto text-white">
            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-white/[0.1] blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Turn your experience into career leverage.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#EDE8F5]/90 leading-relaxed">
                Join thousands of candidates applying with calibrated confidence
                and role-specific preparation.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate("/interview")}
                  className="bg-white text-[#3D52A0] hover:bg-[#EDE8F5] transition font-bold px-8 py-3.5 rounded-full text-sm cursor-pointer shadow-md"
                >
                  Start Your Analysis
                </button>
                <button
                  onClick={() => navigate("/pricing")}
                  className="border border-white/40 text-white hover:bg-white/10 transition font-semibold px-8 py-3.5 rounded-full text-sm cursor-pointer"
                >
                  View Credit Plans
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;

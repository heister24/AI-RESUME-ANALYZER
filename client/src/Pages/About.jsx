import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  ScanText,
  Target,
  ShieldCheck,
  Compass,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-[#EDE8F5] text-[#18203D] font-sans selection:bg-[#3D52A0] selection:text-white">
      <Navbar />

      <div className="relative overflow-hidden bg-grid-pattern">
        {/* Soft atmospheric lighting in Foundations palette */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#7091E6]/15 blur-[150px]" />
        <div className="pointer-events-none absolute top-96 -right-20 h-[400px] w-[400px] rounded-full bg-[#ADBBDA]/25 blur-[140px]" />

        <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ADBBDA]/60 bg-white/80 px-3.5 py-1 text-xs font-semibold text-[#3D52A0] mb-4 shadow-xs">
              <Compass className="h-3.5 w-3.5 text-[#3D52A0]" />
              <span>Platform Mission</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#18203D] leading-[1.08]">
              The science of passing the recruiter screen.
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#5E6987]">
              Modern hiring filters reject more than 75% of qualified resumes
              before a human ever lays eyes on them. ResumeLens was created to
              demystify algorithmic screening and turn genuine candidate experience
              into undeniable career proof.
            </p>
          </motion.div>

          {/* Architecture comparison */}
          <section className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="bg-white/85 rounded-3xl p-8 border border-rose-200 shadow-lg shadow-rose-900/5">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
                The Problem
              </span>
              <h2 className="mt-2 text-2xl font-bold text-[#18203D]">
                Generic Keyword Checkers
              </h2>
              <ul className="mt-6 space-y-3.5 text-xs sm:text-sm text-[#5E6987]">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">&times;</span>
                  <span>Count naive keyword frequency without understanding semantic context.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">&times;</span>
                  <span>Produce generic suggestions that read like boilerplate buzzwords.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">&times;</span>
                  <span>End at the score, leaving you unprepared for the actual interview rounds.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-[#3D52A0] shadow-xl shadow-[#3D52A0]/10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3D52A0]">
                The Solution
              </span>
              <h2 className="mt-2 text-2xl font-bold text-[#18203D]">
                ResumeLens Neural Parser
              </h2>
              <ul className="mt-6 space-y-3.5 text-xs sm:text-sm text-[#18203D]/90">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Evaluates business impact, scope of ownership, and seniority phrasing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Pinpoints exact competency gaps and suggests quantified bullet rewrites.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Synthesizes role-specific STAR scenario questions and a 7-day preparation sprint.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 3 Core Pillars */}
          <section className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ScanText,
                title: "Clarity over Fluff",
                desc: "We prioritize tangible metric transformations over vague adjectives, making achievements pop to hiring managers.",
              },
              {
                icon: Target,
                title: "Role Specificity",
                desc: "A Staff Engineer resume requires vastly different framing than a Junior Developer. Our models calibrate to your target level.",
              },
              {
                icon: ShieldCheck,
                title: "Total Privacy",
                desc: "Candidate data is processed in stateless memory buffers and never shared with recruiting databases or third-party crawlers.",
              },
            ].map((col, idx) => {
              const Icon = col.icon;
              return (
                <div key={idx} className="bg-white/90 rounded-3xl p-7 border border-[#ADBBDA]/50 shadow-md shadow-[#3D52A0]/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EDE8F5] text-[#3D52A0] border border-[#ADBBDA]/60 mb-5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#18203D]">{col.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#5E6987] leading-relaxed">
                    {col.desc}
                  </p>
                </div>
              );
            })}
          </section>

          {/* Bottom Action */}
          <div className="mt-16 text-center">
            <Link
              to="/interview"
              className="pearl-btn inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold"
            >
              <span>Test Your Resume Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default About;
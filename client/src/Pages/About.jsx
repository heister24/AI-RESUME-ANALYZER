import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Lightbulb, Target, ShieldCheck } from "lucide-react";

const About = () => {
  const cards = [
    {
      icon: Lightbulb,
      title: "Clarity first",
      description: "Understand what your resume communicates before a recruiter has to guess."
    },
    {
      icon: Target,
      title: "Useful feedback",
      description: "Prioritize improvements that make your experience stronger and easier to find."
    },
    {
      icon: ShieldCheck,
      title: "More confidence",
      description: "Prepare with intention so every application and interview feels more deliberate."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
            About ResumeLens
          </p>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
              Better applications start with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">clearer story.</span>
            </h1>
            <p className="text-xl leading-relaxed text-gray-600 pb-2">
              ResumeLens helps job seekers turn experience into focused, role-ready applications with practical AI feedback and actionable insights.
            </p>
          </div>
        </motion.div>

        <section className="mt-20 grid gap-8 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article 
                key={card.title} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="group relative overflow-hidden rounded-3xl border border-gray-200/60 bg-white/60 p-8 shadow-sm backdrop-blur-xl transition-all hover:shadow-xl hover:border-emerald-200"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl transition-all group-hover:bg-emerald-500/20" />
                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-sm transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-8 text-2xl font-bold text-gray-900">{card.title}</h2>
                  <p className="mt-4 leading-relaxed text-gray-600">{card.description}</p>
                </div>
              </motion.article>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default About;

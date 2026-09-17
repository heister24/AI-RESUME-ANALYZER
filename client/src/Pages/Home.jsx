import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FileSearch, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

const Home = () => {
  const { navigate } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-800">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Resume Analysis</span>
          </div>
          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl">
            Make your resume{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              impossible to overlook.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-600">
            Upload your resume and let focused AI feedback turn your good
            experience into a compelling story tailored perfectly to your target
            role.
          </p>
        </motion.div>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl bg-gray-900 p-8 text-white shadow-2xl sm:p-12"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />

            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 backdrop-blur-md">
                <FileSearch className="h-6 w-6" />
              </div>
              <h2 className="mt-8 text-3xl font-bold tracking-tight">
                Analyze your resume
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-gray-400">
                Set the role context and let our AI engine generate actionable,
                line-by-line feedback before you apply.
              </p>
              <button
                className="group mt-10 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/50"
                onClick={() => navigate("/interview")}
              >
                Start Analysis
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center gap-8 rounded-3xl border border-gray-200/60 bg-white/60 p-8 shadow-sm backdrop-blur-xl sm:p-12"
          >
            {[
              {
                title: "Clear score",
                desc: "See what is working at a glance.",
              },
              {
                title: "Smart feedback",
                desc: "Prioritize changes that matter.",
              },
              {
                title: "Better applications",
                desc: "Apply with a resume built for the role.",
              },
            ].map((feature, idx) => (
              <div key={feature.title} className="flex gap-4">
                <div className="mt-1 flex shrink-0 items-center justify-center text-emerald-500">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <strong className="block text-lg font-semibold text-gray-900">
                    0{idx + 1}. {feature.title}
                  </strong>
                  <span className="mt-1 block text-gray-600">
                    {feature.desc}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Home;

import { useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquareCheck, Terminal, Mail, Clock, ShieldCheck } from "lucide-react";

const Contact = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#EDE8F5] text-[#18203D] font-sans selection:bg-[#3D52A0] selection:text-white">
      <Navbar />

      <div className="relative overflow-hidden bg-grid-pattern">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#7091E6]/15 blur-[160px]" />
        <div className="pointer-events-none absolute top-80 right-0 h-[400px] w-[400px] rounded-full bg-[#ADBBDA]/25 blur-[140px]" />

        <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-md"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ADBBDA]/60 bg-white/90 px-3.5 py-1 text-xs font-semibold text-[#3D52A0] shadow-xs mb-4">
                <Terminal className="h-3.5 w-3.5 text-[#3D52A0]" />
                <span>Executive Contact</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#18203D]">
                Get in touch with our team.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[#5E6987]">
                Have questions regarding custom algorithmic weights, team
                workspaces, or career coaching partnerships? We typically respond
                within 4 hours.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 border border-[#ADBBDA]/50 shadow-xs">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EDE8F5] text-[#3D52A0] border border-[#ADBBDA]/50">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8697C4]">
                      Direct Support Email
                    </span>
                    <p className="text-xs font-bold text-[#18203D]">
                      support@resumelens.ai
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 border border-[#ADBBDA]/50 shadow-xs">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EDE8F5] text-[#3D52A0] border border-[#ADBBDA]/50">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8697C4]">
                      Average Response Time
                    </span>
                    <p className="text-xs font-bold text-[#18203D]">
                      &lt; 4 Hours (Mon - Sat)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 border border-[#ADBBDA]/50 shadow-xs">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EDE8F5] text-[#3D52A0] border border-[#ADBBDA]/50">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8697C4]">
                      Confidentiality Guarantee
                    </span>
                    <p className="text-xs font-bold text-[#18203D]">
                      NDAs honored upon request
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <form
                className="pro-card-elevated rounded-3xl p-6 sm:p-10"
                onSubmit={handleSubmit}
              >
                <div className="space-y-4">
                  <AnimatePresence>
                    {sent && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-xs font-semibold text-emerald-800"
                        role="status"
                      >
                        <MessageSquareCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span>Thank you! Your message has been queued for our team.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
                        Full Name
                      </label>
                      <input
                        className="w-full rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] px-4 py-3 text-xs text-[#18203D] placeholder-[#8697C4] outline-none transition focus:border-[#3D52A0] focus:ring-1 focus:ring-[#7091E6]/30"
                        placeholder="Alex Morgan"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
                        Work or Personal Email
                      </label>
                      <input
                        className="w-full rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] px-4 py-3 text-xs text-[#18203D] placeholder-[#8697C4] outline-none transition focus:border-[#3D52A0] focus:ring-1 focus:ring-[#7091E6]/30"
                        type="email"
                        placeholder="alex@domain.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
                      Subject / Inquiry Type
                    </label>
                    <select
                      className="w-full rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] px-4 py-3 text-xs text-[#18203D] outline-none transition focus:border-[#3D52A0] focus:ring-1 focus:ring-[#7091E6]/30"
                    >
                      <option value="general">General Product Question</option>
                      <option value="enterprise">Enterprise / Recruiter Team License</option>
                      <option value="billing">Billing or Credit Inquiry</option>
                      <option value="feedback">Bug Report or Feature Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
                      Message Details
                    </label>
                    <textarea
                      className="min-h-32 w-full resize-y rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] px-4 py-3 text-xs text-[#18203D] placeholder-[#8697C4] outline-none transition focus:border-[#3D52A0] focus:ring-1 focus:ring-[#7091E6]/30 leading-relaxed"
                      placeholder="Describe your inquiry, career goals, or technical feedback..."
                      required
                    />
                  </div>

                  <button
                    className="pearl-btn mt-2 inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold cursor-pointer w-full sm:w-auto"
                    type="submit"
                  >
                    <span>Send Message</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contact;

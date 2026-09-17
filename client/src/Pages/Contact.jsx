import { useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquareCheck } from "lucide-react";

const Contact = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              Contact us
            </p>
            <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl">
              Let&apos;s make your next application <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">sharper.</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-600">
              Have a question or an idea for ResumeLens? Send us a note and our team will get back to you shortly.
            </p>
            
            <div className="mt-12 hidden lg:block">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-sm">
                <MessageSquareCheck className="h-10 w-10" />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form 
              className="relative overflow-hidden rounded-3xl border border-gray-200/60 bg-white/70 p-8 shadow-xl backdrop-blur-xl sm:p-12" 
              onSubmit={handleSubmit}
            >
              {/* Decorative blobs for form */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-teal-500/10 blur-2xl" />

              <div className="relative z-10 space-y-6">
                <AnimatePresence>
                  {sent && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                      className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-5 py-4 text-emerald-800 border border-emerald-200/50" 
                      role="status"
                    >
                      <MessageSquareCheck className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium">Thanks! Your message is ready for our team.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Name</label>
                  <input 
                    className="w-full rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 text-gray-900 shadow-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20" 
                    placeholder="Jane Doe"
                    required 
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Email</label>
                  <input 
                    className="w-full rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 text-gray-900 shadow-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20" 
                    type="email" 
                    placeholder="jane@example.com"
                    required 
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Message</label>
                  <textarea 
                    className="min-h-[160px] w-full resize-y rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 text-gray-900 shadow-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20" 
                    placeholder="How can we help?"
                    required 
                  />
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-gray-900 px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-gray-900/20 focus:outline-none focus:ring-4 focus:ring-gray-900/30 sm:w-auto" 
                  type="submit"
                >
                  <span>Send Message</span>
                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Contact;

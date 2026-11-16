import { Link } from "react-router-dom";
import { Terminal, Globe, Mail, MessageCircle } from "lucide-react";
import BrandMark from "./BrandMark";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[#ADBBDA]/40 bg-[#EDE8F5]/70 px-6 py-14 text-[#5E6987] sm:px-10 lg:py-18">
      {/* Subtle ambient lighting in Foundations palette */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7091E6]/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-10 bottom-0 h-64 w-64 rounded-full bg-[#ADBBDA]/15 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl z-10">
        <div className="grid gap-10 border-b border-[#ADBBDA]/30 pb-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="max-w-md">
            <BrandMark theme="light" size="lg" />
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#5E6987]">
              Precision AI resume scoring, role-tailored gap analysis, and comprehensive interview roadmaps — built for professionals who value clarity, architectural minimalism, and execution.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ADBBDA]/60 bg-white/60 px-3 py-1 text-xs text-[#3D52A0] font-semibold shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7091E6] animate-pulse" />
                Theme: Foundations
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between lg:justify-end lg:gap-16">
            <nav aria-label="Product links">
              <p className="text-xs font-bold uppercase tracking-wider text-[#18203D]">
                Platform
              </p>
              <ul className="mt-3.5 flex flex-col gap-2.5 text-xs sm:text-sm">
                <li>
                  <Link className="transition hover:text-[#3D52A0]" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-[#3D52A0]" to="/interview">
                    Analyze Resume
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-[#3D52A0]" to="/pricing">
                    Pricing & Credits
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-[#3D52A0]" to="/report">
                    Analysis Reports
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Company links">
              <p className="text-xs font-bold uppercase tracking-wider text-[#18203D]">
                Company
              </p>
              <ul className="mt-3.5 flex flex-col gap-2.5 text-xs sm:text-sm">
                <li>
                  <Link className="transition hover:text-[#3D52A0]" to="/about">
                    About Platform
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-[#3D52A0]" to="/contact">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-[#3D52A0]" to="/profile">
                    Account Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-[#5E6987]">
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-[#3D52A0]" />
            <span>© {new Date().getFullYear()} ResumeLens. Foundations architectural design system.</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="transition hover:text-[#3D52A0] flex items-center gap-1"
              aria-label="Website"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Global</span>
            </a>
            <a
              href="mailto:contact@resumelens.ai"
              className="transition hover:text-[#3D52A0] flex items-center gap-1"
              aria-label="Email"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Support</span>
            </a>
            <Link
              to="/contact"
              className="transition hover:text-[#3D52A0] flex items-center gap-1"
              aria-label="Chat"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Feedback</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
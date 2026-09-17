import { Link } from "react-router-dom";
import { Sparkles, FileSearch, Globe, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gray-950 px-6 py-16 text-gray-400 sm:px-10 lg:py-20">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl z-10">
        <div className="grid gap-12 border-b border-gray-800 pb-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-center gap-3 text-2xl font-bold tracking-tight text-white transition-opacity hover:opacity-90">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 backdrop-blur-md">
                <FileSearch className="h-5 w-5" />
              </div>
              ResumeLens
            </Link>
            <p className="mt-6 text-base leading-relaxed text-gray-400">
              Turn your experience into a clearer story. Our AI-powered analysis helps you craft perfectly tailored applications that stand out to recruiters.
            </p>
          </div>
          
          <div className="flex flex-col gap-10 sm:flex-row sm:justify-between lg:justify-end lg:gap-20">
            <nav aria-label="Footer navigation">
              <p className="font-semibold text-gray-50 tracking-wide uppercase text-sm">Product</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                <li><Link className="transition hover:text-emerald-400" to="/">Home</Link></li>
                <li><Link className="transition hover:text-emerald-400" to="/interview">Analysis Setup</Link></li>
              </ul>
            </nav>
            
            <nav aria-label="Company navigation">
              <p className="font-semibold text-gray-50 tracking-wide uppercase text-sm">Company</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                <li><Link className="transition hover:text-emerald-400" to="/about">About Us</Link></li>
                <li><Link className="transition hover:text-emerald-400" to="/contact">Contact</Link></li>
              </ul>
            </nav>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>© {new Date().getFullYear()} ResumeLens. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-5 text-gray-500">
            <a href="#" className="transition hover:text-emerald-400" aria-label="Website">
              <Globe className="h-5 w-5" />
            </a>
            <a href="#" className="transition hover:text-emerald-400" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
            <a href="#" className="transition hover:text-emerald-400" aria-label="Chat">
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

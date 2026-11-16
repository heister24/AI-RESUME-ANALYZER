import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { logout } from "../services/authApi";
import BrandMark from "./BrandMark";
import { ChevronDown, Menu, X, ArrowRight, Wallet, User, FileText, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { user, setUser, navigate } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      await logout();
      setUser(null);
      setShowUserMenu(false);
      setMobileMenuOpen(false);
      navigate("/login");
    } finally {
      setLoggingOut(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowUserMenu(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 rounded-full ${
      isActive
        ? "text-[#3D52A0] bg-[#EDE8F5] shadow-xs"
        : "text-[#5E6987] hover:text-[#3D52A0] hover:bg-[#EDE8F5]/60"
    }`;

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
      {/* Floating Island Navigation Dock (Foundations Theme) */}
      <div className="mx-auto max-w-6xl rounded-full border border-[#ADBBDA]/50 bg-white/85 px-3.5 py-1.5 sm:px-5 sm:py-2 backdrop-blur-2xl shadow-[0_8px_30px_rgba(61,82,160,0.08)]">
        <div className="flex items-center justify-between">
          {/* Brand Mark with status pill */}
          <div className="flex items-center gap-3 sm:gap-4">
            <BrandMark theme="light" size="sm" />
            <div className="hidden lg:flex items-center gap-1.5 pl-3 border-l border-[#ADBBDA]/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7091E6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3D52A0]"></span>
              </span>
              <span className="text-[10px] font-medium tracking-wide text-[#5E6987]">
                ATS Engine v3.2
              </span>
            </div>
          </div>

          {/* Desktop Center Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 rounded-full border border-[#ADBBDA]/30 bg-[#EDE8F5]/50 p-1"
            aria-label="Main navigation"
          >
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/interview" className={navLinkClass}>
              Analyzer
            </NavLink>
            <NavLink to="/pricing" className={navLinkClass}>
              Pricing
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {user ? (
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                {/* 1. SEPARATE DISTINCT CREDITS BADGE */}
                <Link
                  to="/pricing"
                  className="flex items-center gap-1.5 rounded-full border border-[#ADBBDA]/60 bg-[#EDE8F5] px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-xs font-semibold text-[#3D52A0] hover:bg-[#E2DCED] hover:border-[#3D52A0]/40 transition-all cursor-pointer shadow-xs"
                  title="Your Available Analysis Credits (Click to buy more)"
                >
                  <Wallet className="h-3.5 w-3.5 text-[#3D52A0] shrink-0" />
                  <span className="font-bold">{user.tokens ?? 3}</span>
                  <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider text-[#5E6987]">
                    Credits
                  </span>
                </Link>

                {/* 2. SEPARATE DISTINCT USER PROFILE MENU */}
                <div ref={userMenuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setShowUserMenu((prev) => !prev)}
                    aria-expanded={showUserMenu}
                    aria-haspopup="menu"
                    className="flex items-center gap-2 rounded-full border border-[#ADBBDA]/60 bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold text-[#18203D] shadow-xs transition-all hover:border-[#3D52A0]/40 hover:bg-[#EDE8F5]/40 cursor-pointer"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3D52A0] text-[10px] font-bold text-white">
                      {(user.name || user.username || user.email || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                    <span className="hidden sm:inline max-w-28 truncate text-[#18203D]">
                      {user.name || user.username || "Account"}
                    </span>
                    <ChevronDown
                      className={`h-3 w-3 text-[#5E6987] transition-transform duration-200 ${
                        showUserMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <UserMenu
                        user={user}
                        onSignOut={handleSignOut}
                        loggingOut={loggingOut}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <NavLink
                  to="/login"
                  className="rounded-full px-4 py-1.5 text-xs font-semibold text-[#5E6987] transition-colors hover:text-[#3D52A0]"
                >
                  Sign in
                </NavLink>
                <NavLink
                  to="/register"
                  className="pearl-btn inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-3 w-3" />
                </NavLink>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-full border border-[#ADBBDA]/60 bg-white text-[#18203D] cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Foundations Theme) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 mx-auto max-w-6xl rounded-3xl border border-[#ADBBDA]/50 bg-white/95 p-4 shadow-2xl backdrop-blur-2xl text-[#18203D]"
          >
            {/* If logged in on mobile, display concise account summary card */}
            {user && (
              <div className="mb-3 rounded-2xl bg-[#EDE8F5]/60 border border-[#ADBBDA]/40 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3D52A0] text-xs font-bold text-white">
                      {(user.name || user.username || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#18203D] truncate">
                        {user.name || user.username || "Account"}
                      </p>
                      <p className="text-[10px] text-[#5E6987] truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 rounded-full border border-[#ADBBDA]/60 bg-white px-2.5 py-1 text-xs font-semibold text-[#3D52A0]"
                  >
                    <Wallet className="h-3 w-3 text-[#3D52A0]" />
                    <span>{user.tokens ?? 3}</span>
                  </Link>
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 text-xs font-semibold text-[#18203D] hover:bg-[#EDE8F5] rounded-xl"
              >
                Home
              </Link>
              <Link
                to="/interview"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 text-xs font-semibold text-[#18203D] hover:bg-[#EDE8F5] rounded-xl"
              >
                Resume Analyzer
              </Link>
              <Link
                to="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 text-xs font-semibold text-[#18203D] hover:bg-[#EDE8F5] rounded-xl"
              >
                Pricing & Plans
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 text-xs font-semibold text-[#18203D] hover:bg-[#EDE8F5] rounded-xl"
              >
                About Platform
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 text-xs font-semibold text-[#18203D] hover:bg-[#EDE8F5] rounded-xl"
              >
                Contact Team
              </Link>

              {user ? (
                <>
                  <Link
                    to="/report"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3.5 py-2 text-xs font-semibold text-[#18203D] hover:bg-[#EDE8F5] rounded-xl flex items-center gap-2"
                  >
                    <FileText className="h-3.5 w-3.5 text-[#5E6987]" />
                    <span>Saved Reports</span>
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3.5 py-2 text-xs font-semibold text-[#18203D] hover:bg-[#EDE8F5] rounded-xl flex items-center gap-2"
                  >
                    <User className="h-3.5 w-3.5 text-[#5E6987]" />
                    <span>Profile Settings</span>
                  </Link>

                  <div className="mt-2 pt-2 border-t border-[#ADBBDA]/30">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={loggingOut}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>{loggingOut ? "Signing out..." : "Sign out"}</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-3 pt-3 border-t border-[#ADBBDA]/30 flex items-center gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2 text-xs font-semibold text-[#18203D] border border-[#ADBBDA]/60 bg-white rounded-full"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2 text-xs font-bold text-white bg-[#3D52A0] rounded-full"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
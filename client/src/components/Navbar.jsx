import { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { logout } from "../services/authApi";
import BrandMark from "./BrandMark";
import { ChevronDown, UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { user, setUser, navigate } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      await logout();
      setUser(null);
      setShowUserMenu(false);
      navigate("/login");
    } finally {
      setLoggingOut(false);
    }
  };
  // close show menu if clicks outisde the box or clicking escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const linkClass = ({ isActive }) =>
    `relative rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
      isActive
        ? "bg-emerald-50 text-emerald-700"
        : "text-gray-500 hover:bg-gray-100/80 hover:text-gray-900"
    }`;

  const handleShowMenu = () => {
    setShowUserMenu((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/70 px-6 py-4 shadow-sm backdrop-blur-xl sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <BrandMark />
        </div>

        <nav
          className="order-3 flex w-full items-center justify-center gap-2 sm:order-2 sm:w-auto"
          aria-label="Main navigation"
        >
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
          <NavLink to="/pricing" className={linkClass}>
            Pricing
          </NavLink>
        </nav>

        <div className="order-2 flex items-center gap-4 sm:order-3">
          {user ? (
            <div ref={userMenuRef} className="relative">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleShowMenu}
                aria-expanded={showUserMenu}
                aria-haspopup="menu"
                aria-label="Open user menu"
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50"
              >
                <UserCircle className="h-5 w-5 text-emerald-600" />
                <span className="hidden max-w-32 truncate sm:inline">
                  {user.username || user.email || "Your workspace"}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showUserMenu ? "rotate-180" : ""}`}
                />
              </motion.button>
              {showUserMenu && (
                <UserMenu
                  user={user}
                  onSignOut={handleSignOut}
                  loggingOut={loggingOut}
                />
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:text-emerald-600"
              >
                Sign in
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow"
              >
                Get Started
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

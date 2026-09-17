import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { logout } from "../services/authApi";
import BrandMark from "./BrandMark";
import { LogOut, UserCircle } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, setUser, navigate } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      await logout();
      setUser(null);
      navigate("/login");
    } finally {
      setLoggingOut(false);
    }
  };

  const linkClass = ({ isActive }) =>
    `relative rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
      isActive
        ? "bg-emerald-50 text-emerald-700"
        : "text-gray-500 hover:bg-gray-100/80 hover:text-gray-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/70 px-6 py-4 shadow-sm backdrop-blur-xl sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center">
          <BrandMark />
        </div>

        <nav className="order-3 flex w-full items-center justify-center gap-2 sm:order-2 sm:w-auto" aria-label="Main navigation">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        <div className="order-2 flex items-center gap-4 sm:order-3">
          {user ? (
            <>
              <div className="hidden items-center gap-2 rounded-full border border-gray-200/60 bg-gray-50/50 px-3 py-1.5 sm:flex">
                <UserCircle className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">
                  {user.username || user.email || "Your workspace"}
                </span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-red-600 hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
                type="button"
                onClick={handleSignOut}
                disabled={loggingOut}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">{loggingOut ? "Signing out..." : "Sign out"}</span>
              </motion.button>
            </>
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

import { NavLink } from "react-router-dom";
import {
  CurrencyIcon,
  FileText,
  LogOut,
  Settings,
  UserRoundPenIcon,
  Wallet,
} from "lucide-react";
import { motion } from "framer-motion";

const UserMenu = ({ user, onSignOut, loggingOut }) => {
  const displayName = user?.username || user?.name || "Your workspace";

  const menuLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2 text-xs font-medium rounded-xl transition-all ${
      isActive
        ? "bg-[#EDE8F5] text-[#3D52A0] font-semibold"
        : "text-[#5E6987] hover:bg-[#EDE8F5]/60 hover:text-[#3D52A0]"
    }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className="absolute right-0 top-full mt-2.5 w-64 overflow-hidden rounded-2xl border border-[#ADBBDA]/60 bg-white/95 p-1.5 shadow-2xl backdrop-blur-2xl z-50 text-[#18203D]"
    >
      {/* User Info Header */}
      <div className="border-b border-[#ADBBDA]/30 px-3.5 py-3 mb-1">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3D52A0] text-sm font-bold text-white border border-[#ADBBDA]/40">
            {(user?.name || user?.username || "U").charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-[#18203D]">
              {displayName}
            </p>
            {user?.email && (
              <p className="truncate text-[11px] text-[#5E6987]">{user.email}</p>
            )}
          </div>
        </div>

        {/* Tokens pill */}
        <div className="mt-2.5 flex items-center justify-between rounded-lg bg-[#EDE8F5]/80 px-2.5 py-1.5 border border-[#ADBBDA]/40">
          <span className="text-[11px] text-[#5E6987] flex items-center gap-1.5 font-medium">
            <Wallet className="h-3 w-3 text-[#3D52A0]" />
            Credits Balance
          </span>
          <span className="text-xs font-bold text-[#3D52A0]">
            {user?.tokens ?? 3} left
          </span>
        </div>
      </div>

      <nav className="space-y-0.5" aria-label="Account navigation">
        <NavLink to="/profile" className={menuLinkClass}>
          <UserRoundPenIcon className="h-3.5 w-3.5 text-[#5E6987]" />
          Profile
        </NavLink>
        <NavLink to="/report" className={menuLinkClass}>
          <FileText className="h-3.5 w-3.5 text-[#5E6987]" />
          Saved Reports
        </NavLink>
        <NavLink to="/pricing" className={menuLinkClass}>
          <CurrencyIcon className="h-3.5 w-3.5 text-[#5E6987]" />
          Buy Credits
        </NavLink>
        <NavLink to="/interview" className={menuLinkClass}>
          <Settings className="h-3.5 w-3.5 text-[#5E6987]" />
          Resume Analyzer
        </NavLink>
      </nav>

      <div className="mt-1 border-t border-[#ADBBDA]/30 pt-1">
        <button
          type="button"
          onClick={onSignOut}
          disabled={loggingOut}
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LogOut className="h-3.5 w-3.5" />
          {loggingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </motion.div>
  );
};

export default UserMenu;
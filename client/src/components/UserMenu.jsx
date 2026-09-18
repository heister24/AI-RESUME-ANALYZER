import { NavLink } from "react-router-dom";
import {
  CurrencyIcon,
  FileText,
  LogOut,
  Settings,
  UserCircle,
  UserRoundPenIcon,
} from "lucide-react";

const UserMenu = ({ user, onSignOut, loggingOut }) => {
  const displayName = user?.username || user?.email || "Your workspace";

  const menuLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-emerald-50 text-emerald-700"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-900/10">
      <div className="border-b border-gray-100 px-4 py-4">
        <div className="flex items-center gap-3">
          <UserCircle className="h-9 w-9 shrink-0 text-emerald-600" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              {displayName}
            </p>
            {user?.username && user?.email && (
              <p className="truncate text-xs text-gray-500">{user.email}</p>
            )}
          </div>
        </div>
      </div>

      <nav className="py-2" aria-label="Account navigation">
        <NavLink to="/profile" className={menuLinkClass}>
          <UserRoundPenIcon className="h-4 w-4" />
          Profile
        </NavLink>
        <NavLink to="/report" className={menuLinkClass}>
          <FileText className="h-4 w-4" />
          Reports
        </NavLink>
        <NavLink to="/billing" className={menuLinkClass}>
          <CurrencyIcon className="h-4 w-4" />
          Billing
        </NavLink>
        <NavLink to="/interview" className={menuLinkClass}>
          <Settings className="h-4 w-4" />
          Setting
        </NavLink>
      </nav>

      <div className="border-t border-gray-100 p-2">
        <button
          type="button"
          onClick={onSignOut}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut className="h-4 w-4" />
          {loggingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </div>
  );
};

export default UserMenu;

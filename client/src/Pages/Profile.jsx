import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { updateProfile } from "../services/authApi";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  Loader2,
  Coins,
  LogOut,
  ArrowRight,
  Lock,
  Compass,
  FileSearch,
  Check,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);

  // Active Tab state
  const [activeTab, setActiveTab] = useState("personal");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNo: "",
    city: "",
    state: "",
    gender: "",
  });

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // Initialize form when user data is ready
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phoneNo: user.phoneNo || "",
        city: user.city || "",
        state: user.state || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (statusMessage.text) setStatusMessage({ type: "", text: "" });
  };
  // reset functionality
  const handleReset = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phoneNo: user.phoneNo || "",
        city: user.city || "",
        state: user.state || "",
        gender: user.gender || "",
      });
      setStatusMessage({ type: "", text: "" });
    }
  };
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage({ type: "", text: "" });

    try {
      const response = await updateProfile({
        name: formData.name,
        city: formData.city,
        state: formData.state,
        gender: formData.gender,
      });

      if (response && response.success) {
        // Update user context so Navbar and other components sync immediately
        const updated = response.user || response.updatedUser;
        if (updated) {
          setUser((prev) => ({ ...prev, ...updated }));
        }
        setStatusMessage({
          type: "success",
          text: response.message || "Profile updated successfully!",
        });
      } else {
        setStatusMessage({
          type: "error",
          text:
            response?.message || "Failed to update profile. Please try again.",
        });
      }
    } catch (err) {
      console.error("Profile update failed:", err);
      const errText =
        err.response?.data?.message ||
        "An unexpected error occurred while saving.";
      setStatusMessage({ type: "error", text: errText });
    } finally {
      setIsSaving(false);
    }
  };

  // Helper formatting for join date
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      })
    : "Recently joined";

  // Calculate profile completeness score
  const calculateCompleteness = () => {
    const fields = [
      formData.name,
      formData.username,
      formData.email,
      formData.phoneNo,
      formData.city,
      formData.state,
      formData.gender,
    ];
    const filled = fields.filter((f) => Boolean(f && f.trim())).length;
    return Math.round((filled / fields.length) * 100);
  };

  const completeness = calculateCompleteness();
  const tokenCount = user?.tokens ?? 3;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900 font-sans selection:bg-emerald-200 selection:text-emerald-900 flex flex-col">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-10 sm:px-10 lg:py-14">
        {/* ================= HERO OVERVIEW CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/75 p-6 shadow-xl backdrop-blur-xl sm:p-8 lg:p-10 mb-8"
        >
          {/* Subtle decorative aura blobs */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* User Identity Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative shrink-0">
                <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl bg-linear-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white text-3xl font-extrabold shadow-lg shadow-emerald-600/25">
                  {(formData.name || formData.username || "R")
                    .charAt(0)
                    .toUpperCase()}
                </div>
                <div
                  title="Account Active"
                  className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md"
                >
                  <span className="h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                    {formData.name || formData.username || "Your Account"}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 px-3 py-1 text-xs font-bold text-emerald-700">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified User
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-gray-600">
                  {formData.username && (
                    <span className="font-semibold text-gray-700">
                      @{formData.username}
                    </span>
                  )}
                  {formData.email && (
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {formData.email}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    Joined {memberSince}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats Pill Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Token Stat */}
              <div className="rounded-2xl border border-gray-200/60 bg-white/80 p-4 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <Coins className="h-4 w-4 text-emerald-600" />
                  AI Credits
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-gray-900">
                    {tokenCount}
                  </span>
                  <span className="text-xs text-gray-400">remaining</span>
                </div>
              </div>

              {/* Profile Completeness */}
              <div className="rounded-2xl border border-gray-200/60 bg-white/80 p-4 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <User className="h-4 w-4 text-teal-600" />
                  Profile
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-gray-900">
                    {completeness}%
                  </span>
                  <span className="text-xs text-gray-400">completed</span>
                </div>
              </div>

              {/* Quick Action Button */}
              <div className="col-span-2 sm:col-span-1 rounded-2xl border border-emerald-200/60 bg-emerald-50/70 p-4 flex flex-col justify-between">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  Resume Copilot
                </div>
                <Link
                  to="/interview"
                  className="mt-2 inline-flex items-center justify-between text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  Analyze Resume
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= TABS NAVIGATION ================= */}
        <div className="flex items-center gap-2 border-b border-gray-200/80 pb-4 mb-8 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("personal")}
            className={`flex cursor-pointer items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-semibold transition-all ${
              activeTab === "personal"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                : "text-gray-600 hover:bg-white/80 hover:text-gray-900"
            }`}
          >
            <User className="h-4 w-4" />
            Personal Details
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`flex cursor-pointer items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-semibold transition-all ${
              activeTab === "security"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                : "text-gray-600 hover:bg-white/80 hover:text-gray-900"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            Security & Account
          </button>
        </div>

        {/* ================= TAB CONTENT ================= */}
        <AnimatePresence mode="wait">
          {activeTab === "personal" && (
            <motion.div
              key="personal-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <form onSubmit={handleSubmit}>
                <div className="rounded-3xl border border-gray-200/70 bg-white/75 p-6 sm:p-10 shadow-xl backdrop-blur-xl">
                  {/* Tab Title */}
                  <div className="border-b border-gray-100 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-gray-900">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Update your identity, contact details, and location for
                        customized interview reports.
                      </p>
                    </div>

                    {/* Completeness Bar */}
                    <div className="w-full sm:w-48">
                      <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1.5">
                        <span>Completion</span>
                        <span className="text-emerald-600 font-bold">
                          {completeness}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                          style={{ width: `${completeness}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status Banner */}
                  {statusMessage.text && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className={`mb-6 flex items-center gap-3 rounded-2xl p-4 border text-sm font-medium ${
                        statusMessage.type === "success"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                          : "bg-red-50 border-red-200 text-red-800"
                      }`}
                    >
                      {statusMessage.type === "success" ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                      )}
                      <span>{statusMessage.text}</span>
                    </motion.div>
                  )}

                  {/* Form Grid */}
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Johnson"
                          className="w-full rounded-2xl border border-gray-200 bg-white/80 py-3.5 pl-12 pr-4 text-gray-900 shadow-xs outline-none transition-all focus:ring-4 focus:ring-emerald-500/15"
                        />
                      </div>
                    </div>

                    {/* Username (Read Only) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Username
                        </label>
                        <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                          <Lock className="h-3 w-3" />
                          Cannot be changed
                        </span>
                      </div>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        disabled
                        className="w-full cursor-not-allowed rounded-2xl border border-gray-200 bg-gray-50/80 px-4 py-3.5 text-gray-500 shadow-xs"
                      />
                    </div>

                    {/* Email (Read Only with verified tag) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Email Address
                        </label>
                        <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                          <Check className="h-3 w-3" />
                          Verified
                        </span>
                      </div>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          disabled
                          className="w-full cursor-not-allowed rounded-2xl border border-gray-200 bg-gray-50/80 py-3.5 pl-12 pr-4 text-gray-500 shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Phone Number (Read Only) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Phone Number
                        </label>
                        <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                          <Lock className="h-3 w-3" />
                          Cannot be changed
                        </span>
                      </div>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phoneNo"
                          value={formData.phoneNo}
                          disabled
                          className="w-full cursor-not-allowed rounded-2xl border border-gray-200 bg-gray-50/80 py-3.5 pl-12 pr-4 text-gray-500 shadow-xs"
                        />
                      </div>
                    </div>

                    {/* City */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        City
                      </label>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="e.g. San Francisco"
                          className="w-full rounded-2xl border border-gray-200 bg-white/80 py-3.5 pl-12 pr-4 text-gray-900 shadow-xs outline-none transition-all focus:ring-4 focus:ring-emerald-500/15"
                        />
                      </div>
                    </div>

                    {/* State */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        State / Province
                      </label>
                      <div className="relative">
                        <Compass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="e.g. California"
                          className="w-full rounded-2xl border border-gray-200 bg-white/80 py-3.5 pl-12 pr-4 text-gray-900 shadow-xs outline-none transition-all focus:ring-4 focus:ring-emerald-500/15"
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Gender
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {["Male", "Female"].map((option) => (
                          <label
                            key={option}
                            className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-6 py-3 text-sm font-medium transition-all ${
                              formData.gender === option
                                ? "border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs ring-2 ring-emerald-600/20"
                                : "border-gray-200 bg-white/80 text-gray-700 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="gender"
                              value={option}
                              checked={formData.gender === option}
                              onChange={handleChange}
                              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Form Footer Action Buttons */}
                  <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">
                    <button
                      type="button"
                      onClick={handleReset}
                      disabled={isSaving}
                      className="cursor-pointer flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 shadow-xs transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Discard Changes
                    </button>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="cursor-pointer flex items-center gap-2 rounded-2xl bg-emerald-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-emerald-600/30 disabled:opacity-70"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Saving changes...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Save Profile
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              key="security-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="rounded-3xl border border-gray-200/70 bg-white/75 p-6 sm:p-10 shadow-xl backdrop-blur-xl">
                <div className="border-b border-gray-100 pb-6 mb-8">
                  <h2 className="text-xl font-bold tracking-tight text-gray-900">
                    Security & Account Preferences
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage session authentication and privacy controls.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Account Protection Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-gray-200/60 bg-white/80 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                        <Lock className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">
                          Password & Authentication
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Your account password is encrypted using modern bcrypt
                          hashing with 10 salt rounds.
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                      Protected
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Profile;

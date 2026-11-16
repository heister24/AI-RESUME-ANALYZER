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
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  Loader2,
  Wallet,
  ArrowRight,
  Lock,
  Compass,
  Check,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("personal");

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNo: "",
    city: "",
    state: "",
    gender: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

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
        const updated = response.user || response.updatedUser;
        if (updated) {
          setUser((prev) => ({ ...prev, ...updated }));
        }
        setStatusMessage({
          type: "success",
          text: response.message || "Profile parameters successfully saved.",
        });
      } else {
        setStatusMessage({
          type: "error",
          text:
            response?.message || "Failed to update profile. Please try again.",
        });
      }
    } catch (err) {
      const errText =
        err.response?.data?.message ||
        "An unexpected error occurred while saving.";
      setStatusMessage({ type: "error", text: errText });
    } finally {
      setIsSaving(false);
    }
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      })
    : "Recently joined";

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
    <div className="min-h-screen bg-[#EDE8F5] text-[#18203D] font-sans selection:bg-[#3D52A0] selection:text-white flex flex-col pb-20">
      <Navbar />

      <div className="relative overflow-hidden bg-grid-pattern flex-1">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#7091E6]/15 blur-[160px]" />
        <div className="pointer-events-none absolute top-96 right-0 h-[400px] w-[400px] rounded-full bg-[#ADBBDA]/25 blur-[140px]" />

        <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Overview Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="pro-card-elevated rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* User Identity Info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="relative shrink-0">
                  <div className="flex h-18 w-18 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-[#EDE8F5] text-[#3D52A0] text-2xl sm:text-3xl font-extrabold border border-[#ADBBDA]/60 shadow-md">
                    {(formData.name || formData.username || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <div
                    title="Account Verified"
                    className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white border border-[#ADBBDA]/60 shadow-xs"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#18203D]">
                      {formData.name || formData.username || "Candidate Workspace"}
                    </h1>
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                      <ShieldCheck className="h-3 w-3 text-emerald-600" />
                      Verified
                    </span>
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#5E6987]">
                    {formData.username && (
                      <span className="font-semibold text-[#18203D]">
                        @{formData.username}
                      </span>
                    )}
                    {formData.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-[#8697C4]" />
                        {formData.email}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-[#8697C4]" />
                      Joined {memberSince}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats Pill Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] p-3.5 shadow-xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8697C4]">
                    <Wallet className="h-3 w-3 text-[#3D52A0]" />
                    AI Credits
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-[#18203D]">
                      {tokenCount}
                    </span>
                    <span className="text-[10px] text-[#5E6987]">available</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] p-3.5 shadow-xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8697C4]">
                    <User className="h-3 w-3 text-[#3D52A0]" />
                    Completeness
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-[#18203D]">
                      {completeness}%
                    </span>
                    <span className="text-[10px] text-[#5E6987]">filled</span>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 rounded-2xl border border-[#ADBBDA]/60 bg-[#EDE8F5]/80 p-3.5 flex flex-col justify-between shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8697C4]">
                    Quick Action
                  </span>
                  <Link
                    to="/interview"
                    className="mt-1 inline-flex items-center justify-between text-xs font-bold text-[#3D52A0] hover:underline"
                  >
                    Run Analyzer
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-[#ADBBDA]/50 pb-3 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("personal")}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "personal"
                  ? "bg-[#3D52A0] text-white font-bold shadow-xs"
                  : "text-[#5E6987] hover:text-[#18203D] hover:bg-white/60"
              }`}
            >
              <User className="h-3.5 w-3.5" />
              Profile Details
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "security"
                  ? "bg-[#3D52A0] text-white font-bold shadow-xs"
                  : "text-[#5E6987] hover:text-[#18203D] hover:bg-white/60"
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Security Architecture
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "personal" && (
              <motion.div
                key="personal-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="pro-card rounded-3xl p-6 sm:p-8">
                    <div className="border-b border-[#ADBBDA]/50 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-bold tracking-tight text-[#18203D]">
                          Personal & Contact Information
                        </h2>
                        <p className="mt-0.5 text-xs text-[#5E6987]">
                          Update your location and name to match your resume header.
                        </p>
                      </div>

                      {/* Completeness Bar */}
                      <div className="w-full sm:w-44">
                        <div className="flex justify-between text-xs font-semibold text-[#5E6987] mb-1">
                          <span>Profile Filled</span>
                          <span className="text-[#18203D] font-bold">
                            {completeness}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-[#EDE8F5] border border-[#ADBBDA]/40 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#3D52A0] transition-all duration-500"
                            style={{ width: `${completeness}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {statusMessage.text && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className={`mb-6 flex items-center gap-2.5 rounded-2xl p-3.5 border text-xs font-semibold ${
                          statusMessage.type === "success"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : "bg-rose-50 border-rose-200 text-rose-800"
                        }`}
                      >
                        {statusMessage.type === "success" ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                        )}
                        <span>{statusMessage.text}</span>
                      </motion.div>
                    )}

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8697C4]" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Alex Morgan"
                            className="w-full rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] py-2.5 pl-10 pr-4 text-xs font-medium text-[#18203D] placeholder-[#8697C4] outline-none transition focus:border-[#3D52A0] focus:ring-1 focus:ring-[#7091E6]/30"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
                            Username
                          </label>
                          <span className="flex items-center gap-1 text-[10px] text-[#8697C4] font-medium">
                            <Lock className="h-2.5 w-2.5" />
                            Permanent
                          </span>
                        </div>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          disabled
                          className="w-full cursor-not-allowed rounded-2xl border border-[#ADBBDA]/40 bg-[#EDE8F5]/60 px-4 py-2.5 text-xs text-[#8697C4]"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
                            Email Address
                          </label>
                          <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                            <Check className="h-3 w-3" />
                            Verified
                          </span>
                        </div>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8697C4]" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            disabled
                            className="w-full cursor-not-allowed rounded-2xl border border-[#ADBBDA]/40 bg-[#EDE8F5]/60 py-2.5 pl-10 pr-4 text-xs text-[#8697C4]"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
                            Phone Number
                          </label>
                          <span className="flex items-center gap-1 text-[10px] text-[#8697C4] font-medium">
                            <Lock className="h-2.5 w-2.5" />
                            Locked
                          </span>
                        </div>
                        <div className="relative">
                          <Phone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8697C4]" />
                          <input
                            type="tel"
                            name="phoneNo"
                            value={formData.phoneNo}
                            disabled
                            className="w-full cursor-not-allowed rounded-2xl border border-[#ADBBDA]/40 bg-[#EDE8F5]/60 py-2.5 pl-10 pr-4 text-xs text-[#8697C4]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
                          City
                        </label>
                        <div className="relative">
                          <MapPin className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8697C4]" />
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="e.g. San Francisco"
                            className="w-full rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] py-2.5 pl-10 pr-4 text-xs font-medium text-[#18203D] placeholder-[#8697C4] outline-none transition focus:border-[#3D52A0] focus:ring-1 focus:ring-[#7091E6]/30"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
                          State / Region
                        </label>
                        <div className="relative">
                          <Compass className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8697C4]" />
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="e.g. California"
                            className="w-full rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] py-2.5 pl-10 pr-4 text-xs font-medium text-[#18203D] placeholder-[#8697C4] outline-none transition focus:border-[#3D52A0] focus:ring-1 focus:ring-[#7091E6]/30"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
                          Gender
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {["Male", "Female"].map((option) => (
                            <label
                              key={option}
                              className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                                formData.gender === option
                                  ? "border-[#3D52A0] bg-[#EDE8F5] text-[#3D52A0]"
                                  : "border-[#ADBBDA]/60 bg-[#F8F6FC] text-[#5E6987] hover:border-[#3D52A0]/40"
                              }`}
                            >
                              <input
                                type="radio"
                                name="gender"
                                value={option}
                                checked={formData.gender === option}
                                onChange={handleChange}
                                className="h-3 w-3 accent-[#3D52A0]"
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#ADBBDA]/50 pt-5">
                      <button
                        type="button"
                        onClick={handleReset}
                        disabled={isSaving}
                        className="ghost-btn cursor-pointer flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-semibold disabled:opacity-50"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Discard Changes</span>
                      </button>

                      <button
                        type="submit"
                        disabled={isSaving}
                        className="pearl-btn cursor-pointer flex items-center gap-1.5 rounded-full px-7 py-2.5 text-xs font-bold disabled:opacity-50"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            <span>Saving Changes...</span>
                          </>
                        ) : (
                          <>
                            <Save className="h-3.5 w-3.5" />
                            <span>Save Profile</span>
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
                transition={{ duration: 0.2 }}
                className="pro-card rounded-3xl p-6 sm:p-8"
              >
                <div className="border-b border-[#ADBBDA]/50 pb-5 mb-6">
                  <h2 className="text-lg font-bold tracking-tight text-[#18203D]">
                    Security & Authentication Controls
                  </h2>
                  <p className="mt-0.5 text-xs text-[#5E6987]">
                    Cryptographic hash validation and session credential management.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EDE8F5] text-[#3D52A0] border border-[#ADBBDA]/50">
                      <Lock className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-[#18203D]">
                        Bcrypt Cryptographic Password Hashing
                      </h3>
                      <p className="text-[11px] text-[#5E6987] mt-0.5 leading-relaxed">
                        Account credentials are salted and hashed with 10 rounds of bcrypt before persistent database commit.
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Active & Protected
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Profile;

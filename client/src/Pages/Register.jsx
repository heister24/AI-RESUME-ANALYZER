import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { register } from "../services/authApi";
import BrandMark from "../components/BrandMark";

const Register = () => {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { setUser, navigate } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !phoneNo.trim() || !username.trim() || !email.trim()) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const data = await register(
        name.trim(),
        username.trim(),
        phoneNo.trim(),
        email.trim(),
        password,
      );
      setUser(data.user);
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Unable to create your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900 font-sans selection:bg-emerald-200 selection:text-emerald-900 flex flex-col">
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-12 sm:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="max-w-xl">
            <div className="mb-8">
              <BrandMark size="lg" />
            </div>

            <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              Start stronger
            </p>
            <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl">
              Build your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">
                career edge.
              </span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-600">
              Create an account to get tailored resume insights in minutes.
              ResumeLens helps you find the signal in your experience.
            </p>

            <div className="mt-12 space-y-5 hidden lg:block">
              <div className="flex items-center gap-4 text-gray-700">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 text-emerald-600 font-bold">
                  1
                </div>
                <p className="font-medium">
                  Instant, role-aware resume feedback
                </p>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 text-emerald-600 font-bold">
                  2
                </div>
                <p className="font-medium">
                  Practical suggestions you can use today
                </p>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 text-emerald-600 font-bold">
                  3
                </div>
                <p className="font-medium">
                  A clearer path from draft to interview
                </p>
              </div>
            </div>
          </div>

          <div>
            <form
              className="relative overflow-hidden rounded-3xl border border-gray-200/60 bg-white/70 p-8 shadow-xl backdrop-blur-xl sm:p-12"
              onSubmit={handleSubmit}
            >
              {/* Decorative blobs for form */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-teal-500/10 blur-2xl" />

              <div className="relative z-10 space-y-6">
                {errorMessage && (
                  <div
                    className="flex items-center gap-3 rounded-2xl bg-red-50 px-5 py-4 text-red-800 border border-red-200/50"
                    role="alert"
                  >
                    <span className="font-medium">{errorMessage}</span>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    className="w-full rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 text-gray-900 shadow-sm outline-none transition-all focus:ring-4 focus:ring-emerald-500/20"
                    type="text"
                    placeholder="Alex Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-md">
                      Cannot be changed later
                    </span>
                  </div>
                  <input
                    className="w-full rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 text-gray-900 shadow-sm outline-none transition-all focus:ring-4 focus:ring-emerald-500/20"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                  />
                  <p className="mt-1.5 text-xs text-gray-500">
                    Your phone number is permanently linked to your profile and
                    cannot be modified once registered.
                  </p>
                </div>

                {/* Username */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Username
                  </label>
                  <input
                    className="w-full rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 text-gray-900 shadow-sm outline-none transition-all focus:ring-4 focus:ring-emerald-500/20"
                    type="text"
                    placeholder="alex_dev"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email address
                  </label>
                  <input
                    className="w-full rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 text-gray-900 shadow-sm outline-none transition-all focus:ring-4 focus:ring-emerald-500/20"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 pr-16 text-gray-900 shadow-sm outline-none transition-all focus:ring-4 focus:ring-emerald-500/20"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div
                    className="mt-3 flex gap-1.5"
                    aria-label="Password strength"
                  >
                    {[1, 2, 3, 4].map((level) => (
                      <span
                        key={level}
                        className={`h-1.5 flex-1 rounded-full ${password.length >= level * 2 ? "bg-emerald-500" : "bg-gray-200"}`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Use at least 6 characters for a stronger password.
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Confirm password
                  </label>
                  <input
                    className="w-full rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 text-gray-900 shadow-sm outline-none transition-all focus:ring-4 focus:ring-emerald-500/20"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <button
                  className="group mt-8 flex cursor-pointer w-full items-center justify-center rounded-2xl bg-gray-900 px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-gray-900/20 focus:outline-none focus:ring-4 focus:ring-gray-900/30 disabled:opacity-70"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>

                <p className="mt-8 text-center text-sm font-medium text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-emerald-600 cursor-pointer hover:text-emerald-500 transition-colors"
                    onClick={() => navigate("/login")}
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;

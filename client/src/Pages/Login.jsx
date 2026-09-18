import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { login } from "../services/authApi";
import BrandMark from "../components/BrandMark";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { setUser, navigate } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const data = await login(email, password);
      console.log("Logged In user", data);
      setUser(data.user);
      navigate("/");
    } catch (error) {
      console.log("Login Error", error);
      const message =
        error.response?.data?.message || "Invalid email or password.";
      setErrorMessage(message);
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
              Welcome back
            </p>
            <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl">
              Sign in to your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">
                workspace.
              </span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-600">
              Pick up where you left off. Turn your resume into your next
              opportunity with sharper scores and clearer feedback.
            </p>
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

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 pr-16 text-gray-900 shadow-sm outline-none transition-all focus:ring-4 focus:ring-emerald-500/20"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <button
                  className="group mt-8 cursor-pointer flex w-full items-center justify-center rounded-2xl bg-gray-900 px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-gray-900/20 focus:outline-none focus:ring-4 focus:ring-gray-900/30 disabled:opacity-70"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                <p className="mt-8 text-center text-sm font-medium text-gray-600">
                  New to ResumeLens?{" "}
                  <button
                    type="button"
                    className="text-emerald-600 cursor-pointer hover:text-emerald-500 transition-colors"
                    onClick={() => navigate("/register")}
                  >
                    Create an account
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

export default Login;

import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { login } from "../services/authApi";
import BrandMark from "../components/BrandMark";
import { ArrowRight, Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

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
      setUser(data.user);
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid credentials. Please verify your email and password.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE8F5] text-[#18203D] font-sans selection:bg-[#3D52A0] selection:text-white flex flex-col justify-center bg-grid-pattern relative">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#7091E6]/15 blur-[150px]" />

      <main className="relative z-10 mx-auto w-full max-w-md px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <BrandMark size="lg" theme="light" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#18203D]">
            Sign in to Workspace
          </h1>
          <p className="mt-1.5 text-xs text-[#5E6987]">
            Access your saved resume diagnostic reports and preparation sprints.
          </p>
        </div>

        <form
          className="rounded-3xl border border-[#ADBBDA]/60 bg-white/95 p-6 sm:p-8 space-y-4 shadow-xl shadow-[#3D52A0]/8 text-[#18203D]"
          onSubmit={handleSubmit}
        >
          {errorMessage && (
            <div
              className="flex items-center gap-2.5 rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs font-medium text-rose-700"
              role="alert"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
              Email Address
            </label>
            <input
              className="w-full rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] px-4 py-3 text-xs text-[#18203D] placeholder-[#8697C4] outline-none transition focus:border-[#3D52A0] focus:ring-1 focus:ring-[#3D52A0]/20"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#5E6987]">
                Password
              </label>
              <button
                type="button"
                className="text-[11px] font-semibold text-[#3D52A0] hover:text-[#18203D] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              className="w-full rounded-2xl border border-[#ADBBDA]/60 bg-[#F8F6FC] px-4 py-3 text-xs text-[#18203D] placeholder-[#8697C4] outline-none transition focus:border-[#3D52A0] focus:ring-1 focus:ring-[#3D52A0]/20"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your account password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="pearl-btn mt-4 w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-xs font-bold cursor-pointer disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign in to Account</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>

          <div className="pt-4 border-t border-[#ADBBDA]/30 text-center">
            <p className="text-xs text-[#5E6987]">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-[#3D52A0] font-semibold underline hover:text-[#18203D]"
              >
                Create one now
              </Link>
            </p>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#5E6987]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#3D52A0]" />
          <span>Encrypted with 256-bit SSL authentication</span>
        </div>
      </main>
    </div>
  );
};

export default Login;
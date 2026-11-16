import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Loader2,
  Layers,
  Cpu,
  Compass,
  ShieldCheck,
  CreditCard,
  Lock,
  ChevronDown,
  ArrowRight,
  Wallet,
} from "lucide-react";
import { createOrder, verifyPayment } from "../services/paymentApi";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "../components/Navbar";

const plans = [
  {
    name: "basic",
    displayName: "Starter Sprint",
    price: 99,
    credits: 5,
    tagline: "Ideal for a single high-priority role application review.",
    perReport: "₹19.8",
    badge: "Starter",
    icon: Layers,
    features: [
      "5 Resume Diagnostic Credits",
      "Full ATS Compatibility Score",
      "Semantic Skill Gap Breakdown",
      "Technical & Role Scenario Questions",
      "7-Day Day-by-Day Preparation Plan",
      "Export PDF & Lifetime Validity",
    ],
    popular: false,
  },
  {
    name: "pro",
    displayName: "Professional Pass",
    price: 299,
    credits: 25,
    tagline: "Best value for active job seekers targeting multiple companies.",
    perReport: "₹12.0",
    badge: "Save 40% · Most Popular",
    icon: Cpu,
    features: [
      "25 Resume Diagnostic Credits",
      "High-Precision ATS Match Scoring",
      "Granular Skill Gaps & Actionable Advice",
      "Technical & Behavioral STAR Questions",
      "7-Day Tailored Action Roadmap",
      "Instant Neural Generation Queue",
      "Export PDF & Lifetime Validity",
    ],
    popular: true,
  },
  {
    name: "super",
    displayName: "Career Suite",
    price: 499,
    credits: 50,
    tagline: "Maximum value for executives, contractors & career switchers.",
    perReport: "₹10.0",
    badge: "Best Value · Only ₹10/Report",
    icon: Compass,
    features: [
      "50 Resume Diagnostic Credits",
      "Unlimited Resume Variant Comparisons",
      "Deep Semantic Role Tailoring",
      "Complete Technical & STAR Question Bank",
      "7-Day Structured Sprint Roadmap",
      "Priority Verification Processing",
      "Non-Expiring Lifetime Balance",
    ],
    popular: false,
  },
];

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Pricing = () => {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handlePayment = async (plan) => {
    if (!user) {
      navigate("/login", { state: { from: "/pricing" } });
      return;
    }

    setLoadingPlan(plan.name);
    setMessage({ text: "", type: "" });

    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        setMessage({
          text: "Razorpay payment gateway failed to load. Please check your internet connection.",
          type: "error",
        });
        setLoadingPlan(null);
        return;
      }

      const data = await createOrder(plan.name);

      if (!data.success) {
        setMessage({
          text: data.message || "Unable to initiate order with server.",
          type: "error",
        });
        setLoadingPlan(null);
        return;
      }

      const options = {
        key: data.key,
        amount: plan.price * 100,
        currency: "INR",
        name: "ResumeLens AI",
        description: `${plan.displayName} - ${plan.credits} Analysis Credits`,
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const verifyData = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              paymentId: data.paymentId,
            });

            if (verifyData.success) {
              setMessage({
                text: `Payment successful! ${plan.credits} analysis credits have been added.`,
                type: "success",
              });
              if (user) {
                setUser({ ...user, tokens: (user.tokens || 0) + plan.credits });
              }
              setTimeout(() => {
                navigate("/interview");
              }, 2000);
            } else {
              setMessage({
                text: verifyData.message || "Payment verification failed",
                type: "error",
              });
            }
          } catch (error) {
            setMessage({ text: "Payment verification failed", type: "error" });
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phoneNo || "",
        },
        theme: {
          color: "#3D52A0",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response) {
        setMessage({
          text: response.error.description || "Payment was cancelled or failed",
          type: "error",
        });
      });

      paymentObject.open();
    } catch (error) {
      console.error(error);
      setMessage({
        text: "An error occurred while setting up payment",
        type: "error",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE8F5] text-[#18203D] font-sans selection:bg-[#3D52A0] selection:text-white">
      <Navbar />

      <div className="relative overflow-hidden bg-grid-pattern">
        {/* Soft atmospheric lighting in Foundations palette */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#7091E6]/15 blur-[150px]" />
        <div className="pointer-events-none absolute top-96 -right-20 h-[400px] w-[400px] rounded-full bg-[#ADBBDA]/25 blur-[140px]" />

        <main className="relative z-10 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ADBBDA]/60 bg-white/80 px-3.5 py-1 text-xs font-semibold text-[#3D52A0] mb-4 shadow-xs">
              <CreditCard className="h-3.5 w-3.5 text-[#3D52A0]" />
              <span>One-Time Credit Packs · Never Expire</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#18203D]">
              Simple, on-demand pricing.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#5E6987] leading-relaxed">
              No subscriptions or unexpected recurring bills. Buy analysis credits when you need them, and use them whenever your next interview arrives.
            </p>

            {/* Current Balance Banner if logged in */}
            {user && (
              <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-[#ADBBDA]/60 bg-white/80 px-4 py-2.5 backdrop-blur-md shadow-xs">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-[#3D52A0]" />
                  <span className="text-xs text-[#5E6987]">Your Current Balance:</span>
                  <span className="text-xs font-bold text-[#18203D]">
                    {user.tokens ?? 3} Credits
                  </span>
                </div>
                <span className="hidden sm:inline text-[#ADBBDA]">•</span>
                <Link
                  to="/interview"
                  className="text-xs font-semibold text-[#3D52A0] hover:underline inline-flex items-center gap-1"
                >
                  <span>Go to Analyzer</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>

          {/* Payment Status Message */}
          {message.text && (
            <div
              className={`mb-8 p-4 rounded-2xl text-center max-w-xl mx-auto text-xs font-semibold border ${
                message.type === "error"
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Pricing Grid (Foundations Theme) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * (index + 1) }}
                  className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-200 ${
                    plan.popular
                      ? "bg-white border-2 border-[#3D52A0] md:-translate-y-2 ring-4 ring-[#7091E6]/20 shadow-2xl shadow-[#3D52A0]/12"
                      : "bg-white/85 border border-[#ADBBDA]/60 hover:border-[#7091E6] shadow-lg shadow-[#3D52A0]/5"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#3D52A0] text-white px-3.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-md whitespace-nowrap">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${
                          plan.popular
                            ? "bg-[#3D52A0] text-white border-[#3D52A0]"
                            : "bg-[#EDE8F5] text-[#3D52A0] border-[#ADBBDA]/60"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5E6987]">
                        {plan.credits} Credits
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#18203D]">
                      {plan.displayName}
                    </h3>
                    <p className="mt-1 text-xs text-[#5E6987] leading-relaxed">
                      {plan.tagline}
                    </p>

                    {/* Price and Rate */}
                    <div className="mt-5 mb-1 flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black text-[#18203D]">
                        ₹{plan.price}
                      </span>
                      <span className="text-xs text-[#5E6987] font-medium">
                        / one-time
                      </span>
                    </div>

                    <p className="text-xs text-[#5E6987] mb-5 pb-5 border-b border-[#ADBBDA]/30">
                      Just {plan.perReport} per full report analysis
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2.5 mb-8">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start text-xs sm:text-sm text-[#18203D]/90 leading-relaxed"
                        >
                          <Check className="h-4 w-4 text-[#7091E6] shrink-0 mr-2.5 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Purchase Button */}
                  <button
                    type="button"
                    onClick={() => handlePayment(plan)}
                    disabled={loadingPlan === plan.name}
                    className={`w-full py-3.5 rounded-full text-xs font-bold transition-all duration-200 flex justify-center items-center cursor-pointer ${
                      plan.popular
                        ? "bg-[#3D52A0] hover:bg-[#2F4080] text-white shadow-md shadow-[#3D52A0]/25"
                        : "bg-[#EDE8F5] hover:bg-[#E2DCED] text-[#3D52A0] border border-[#ADBBDA]/60"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loadingPlan === plan.name ? (
                      <Loader2 className="h-4 w-4 animate-spin text-current" />
                    ) : (
                      `Purchase ${plan.displayName}`
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Trust & Payment Methods Bar */}
          <div className="mt-14 max-w-4xl mx-auto rounded-3xl border border-[#ADBBDA]/50 bg-white/85 p-6 sm:p-8 backdrop-blur-xl shadow-lg shadow-[#3D52A0]/5">
            <div className="grid gap-6 sm:grid-cols-3 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE8F5] border border-[#ADBBDA]/50">
                  <Lock className="h-4 w-4 text-[#3D52A0]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#18203D]">
                    256-bit Encrypted Checkout
                  </h4>
                  <p className="text-[11px] text-[#5E6987] mt-0.5 leading-relaxed">
                    Processed securely via Razorpay PCI-DSS certified gateway.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE8F5] border border-[#ADBBDA]/50">
                  <CreditCard className="h-4 w-4 text-[#3D52A0]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#18203D]">
                    All Payment Modes Accepted
                  </h4>
                  <p className="text-[11px] text-[#5E6987] mt-0.5 leading-relaxed">
                    UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards & NetBanking.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE8F5] border border-[#ADBBDA]/50">
                  <ShieldCheck className="h-4 w-4 text-[#3D52A0]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#18203D]">
                    Lifetime Non-Expiring Credits
                  </h4>
                  <p className="text-[11px] text-[#5E6987] mt-0.5 leading-relaxed">
                    Credits remain in your account until you decide to use them.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#18203D]">
                Frequently Asked Billing Questions
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#5E6987]">
                Everything you need to know about credits and billing
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "What constitutes 1 analysis credit?",
                  a: "1 credit covers an end-to-end multi-page resume diagnostic: full ATS compatibility scoring, keyword gap audit, 7-day action sprint, and role-specific technical & behavioral interview questions.",
                },
                {
                  q: "Do credits ever expire?",
                  a: "No. Your credits never expire. You can purchase a pack today and use them months later whenever you start applying for new roles.",
                },
                {
                  q: "What payment methods are supported?",
                  a: "Through our Razorpay gateway, we accept all major Credit/Debit Cards (Visa, MasterCard, RuPay), UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking, and major mobile wallets.",
                },
                {
                  q: "What happens if a resume fails to analyze?",
                  a: "If an analysis encounters an issue, your credit is immediately preserved and remains in your account. You are only charged for successfully compiled diagnostic reports.",
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/85 rounded-2xl overflow-hidden border border-[#ADBBDA]/50 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#18203D] cursor-pointer hover:bg-[#EDE8F5]/40 transition"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#5E6987] transition-transform shrink-0 ml-3 ${
                        openFaq === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#5E6987] leading-relaxed border-t border-[#ADBBDA]/30">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pricing;
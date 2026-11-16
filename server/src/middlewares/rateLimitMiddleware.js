import { rateLimit } from "express-rate-limit";

/**
 * General API Limiter (150 requests per 15 mins)
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again after 15 minutes.",
  },
});

/**
 * Auth Limiter for Login/Register (10 attempts per 15 mins)
 * Prevents password brute-forcing and credential stuffing.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  message: {
    success: false,
    message:
      "Too many login or registration attempts. Please wait 15 minutes before trying again.",
  },
});

/**
 * AI Report Generation Limiter (6 reports per 10 mins per IP)
 * Prevents costly Gemini API resource exhaustion and DoS.
 */
export const aiReportLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 6,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  message: {
    success: false,
    message:
      "Diagnostic report generation limit reached. Please wait 10 minutes before running another analysis.",
  },
});

/**
 * Bullet Optimizer Limiter (20 optimizations per 10 mins)
 */
export const bulletRewriteLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  message: {
    success: false,
    message:
      "Bullet optimization rate limit reached. Please wait a few moments before optimizing more bullets.",
  },
});

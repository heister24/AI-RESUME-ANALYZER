import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import interviewRouter from "./routes/interviewRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import { apiLimiter } from "./middlewares/rateLimitMiddleware.js";

const app = express();

// Trust reverse proxy (Render, Heroku, Cloudflare) for accurate IP resolution via X-Forwarded-For
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      const clientUrl = (process.env.CLIENT_URL || "").trim().replace(/\/+$/, "");
      if (
        !clientUrl ||
        origin === clientUrl ||
        origin === "http://localhost:5173" ||
        origin === "http://localhost:3000" ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, origin);
      }
      return callback(null, origin);
    },
    credentials: true,
  }),
);

// General rate limiting across all API endpoints
app.use("/api", apiLimiter);

// Production Health Check endpoint for load balancers
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);

export default app;

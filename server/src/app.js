import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import interviewRouter from "./routes/interviewRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import { apiLimiter } from "./middlewares/rateLimitMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
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

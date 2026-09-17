import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import interviewRouter from "./routes/interviewRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

export default app;

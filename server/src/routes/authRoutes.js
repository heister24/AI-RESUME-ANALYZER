import express from "express";
import {
  getCurrentUser,
  updateProfile,
  userlogin,
  userLogout,
  userRegister,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { authLimiter } from "../middlewares/rateLimitMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", authLimiter, userRegister); //http://localhost:5000/api/auth/register
authRouter.post("/login", authLimiter, userlogin); //http://localhost:5000/api/auth/login
authRouter.get("/getme", authMiddleware, getCurrentUser); //http://localhost:5000/api/auth/getme
authRouter.get("/logout", authMiddleware, userLogout); //http://localhost:5000/api/auth/logout
authRouter.post("/update-profile", authMiddleware, updateProfile); //http://localhost:5000/api/auth/update-profle

export default authRouter;

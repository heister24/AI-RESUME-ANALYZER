import express from "express";
import {
  getCurrentUser,
  userlogin,
  userLogout,
  userRegister,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", userRegister); //http://localhost:5000/api/auth/register
authRouter.post("/login", userlogin); //http://localhost:5000/api/auth/login
authRouter.get("/getme", authMiddleware, getCurrentUser); //http://localhost:5000/api/auth/getme
authRouter.get("/logout", authMiddleware, userLogout); //http://localhost:5000/api/auth/logout

export default authRouter;

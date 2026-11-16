import express from "express";
import {
  createOrder,
  verifyPayment,
  handleRazorpayWebhook,
} from "../controllers/paymentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", authMiddleware, createOrder);
paymentRouter.post("/verify-payment", authMiddleware, verifyPayment);
paymentRouter.post("/webhook", handleRazorpayWebhook);

export default paymentRouter;
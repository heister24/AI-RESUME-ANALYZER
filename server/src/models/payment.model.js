import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "INR",
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
  },
  {
    timestamps: true,
  },
);

const PaymentModel = mongoose.model("PaymentModel", paymentSchema);
export default PaymentModel;

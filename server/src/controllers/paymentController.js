import crypto from "crypto";
import razorpay from "../configs/razorpay.js";
import PaymentModel from "../models/payment.model.js";
import UserModel from "../models/user.model.js";

const createOrder = async (req, res) => {
  try {
    const { plan } = req.body;

    const plans = {
      basic: {
        price: 99,
        credits: 5,
      },
      pro: {
        price: 299,
        credits: 25,
      },
      super: {
        price: 499,
        credits: 50,
      },
    };
    const selectedPlan = plans[plan];
    if (!selectedPlan) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan",
      });
    }

    const options = {
      amount: selectedPlan.price * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const payment = await PaymentModel.create({
      user: req.user.id,
      plan,
      amount: selectedPlan.price,
      razorpayOrderId: order.id,
      status: "created",
    });

    res.status(201).json({
      success: true,
      message: "Order created",
      order,
      paymentId: payment._id,
      key: process.env.RAZORPAY_API_KEY, // Expose only the public API key
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to create payment order",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const payment = await PaymentModel.findById(paymentId);

      if (!payment) {
        return res
          .status(404)
          .json({ success: false, message: "Payment not found" });
      }

      payment.razorpayPaymentId = razorpay_payment_id;
      payment.razorpaySignature = razorpay_signature;
      payment.status = "paid";
      await payment.save();

      const plans = {
        basic: { price: 99, credits: 5 },
        pro: { price: 299, credits: 25 },
        super: { price: 499, credits: 50 },
      };

      const selectedPlan = plans[payment.plan];
      if (selectedPlan) {
        // Assuming your user model uses 'tokens' field for credits based on UserModel
        await UserModel.findByIdAndUpdate(payment.user, {
          $inc: { tokens: selectedPlan.credits },
        });
      }

      res
        .status(200)
        .json({ success: true, message: "Payment verified successfully" });
    } else {
      if (paymentId) {
        await PaymentModel.findByIdAndUpdate(paymentId, { status: "failed" });
      }
      res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to verify payment" });
  }
};

/**
 * Server-Side Razorpay Webhook Handler
 * Reconciles payments asynchronously if candidate closes tab before redirect.
 * Fully idempotent to prevent duplicate credit additions.
 */
const handleRazorpayWebhook = async (req, res) => {
  try {
    const webhookSecret =
      process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;
    const webhookSignature = req.headers["x-razorpay-signature"];

    if (!webhookSignature || !webhookSecret) {
      return res.status(400).json({
        success: false,
        message: "Missing signature or webhook secret configuration",
      });
    }

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== webhookSignature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid webhook signature" });
    }

    const event = req.body.event;
    if (event === "payment.captured" || event === "order.paid") {
      const paymentEntity = req.body.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id;
      const paymentId = paymentEntity?.id;

      if (orderId) {
        const paymentRecord = await PaymentModel.findOne({
          razorpayOrderId: orderId,
        });

        // Ensure idempotency: only credit if not already processed by client verify
        if (paymentRecord && paymentRecord.status !== "paid") {
          paymentRecord.status = "paid";
          if (paymentId) paymentRecord.razorpayPaymentId = paymentId;
          await paymentRecord.save();

          const plans = {
            basic: { credits: 5 },
            pro: { credits: 25 },
            super: { credits: 50 },
          };
          const selected = plans[paymentRecord.plan];
          if (selected) {
            await UserModel.findByIdAndUpdate(paymentRecord.user, {
              $inc: { tokens: selected.credits },
            });
          }
        }
      }
    }

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Razorpay webhook reconciliation error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Webhook handler failed" });
  }
};

export { createOrder, verifyPayment, handleRazorpayWebhook };

import api from "./apiClient.js";

export const createOrder = async (plan) => {
  const res = await api.post("/payment/create-order", { plan });
  return res.data;
};

export const verifyPayment = async (paymentData) => {
  const res = await api.post("/payment/verify-payment", paymentData);
  return res.data;
};

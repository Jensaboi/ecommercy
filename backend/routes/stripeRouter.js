import express from "express";
import { Router } from "express";
import { handlePayment } from "../webhooks/stripeWebhook.js";

export const stripeRouter = Router();

stripeRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handlePayment
);

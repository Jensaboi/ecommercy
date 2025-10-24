import { Router } from "express";
import {
  createCheckoutSession,
  getSessionStatus,
} from "../controllers/checkoutControllers.js";

export const checkoutRouter = Router();

checkoutRouter.post("/create-checkout-session", createCheckoutSession);

checkoutRouter.get("/session-status", getSessionStatus);

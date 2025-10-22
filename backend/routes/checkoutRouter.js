import { Router } from "express";
import { handlePayment } from "../controllers/checkoutControllers.js";

export const checkoutRouter = Router();

checkoutRouter.post("/payment", handlePayment);

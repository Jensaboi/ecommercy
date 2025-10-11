import express from "express";
import {
  createOrder,
  deleteOrderWithId,
  getAllOrders,
  getOrderWithId,
} from "../controllers/orderControllers.js";

export const orderRouter = express.Router();

orderRouter.get("/:id", getOrderWithId);

orderRouter.delete("/:id", deleteOrderWithId);

orderRouter.post("/", createOrder);

orderRouter.get("/", getAllOrders);

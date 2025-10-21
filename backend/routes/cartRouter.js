import express from "express";
import {
  deleteItem,
  getCart,
  addItem,
  deleteCart,
  updateItem,
} from "../controllers/cartControllers.js";
export const cartRouter = express.Router();

cartRouter.delete("/:productId", deleteItem);

cartRouter.get("/", getCart);

cartRouter.post("/", addItem);

cartRouter.delete("/", deleteCart);

cartRouter.put("/:id", updateItem);

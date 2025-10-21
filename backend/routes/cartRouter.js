import express from "express";
import {
  deleteItem,
  getAllItems,
  addItem,
  deleteAllItems,
} from "../controllers/cartControllers.js";
export const cartRouter = express.Router();

cartRouter.delete("/:productId", deleteItem);
cartRouter.get("/", getAllItems);
cartRouter.post("/", addItem);
cartRouter.delete("/", deleteAllItems);

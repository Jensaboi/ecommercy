import express from "express";
import {
  getProductWithId,
  deleteProduct,
  getProducts,
  addProduct,
  updateProduct,
  getCategories,
} from "../controllers/productsControllers.js";
import { adminRequired } from "../middleware/adminRequired.js";

export const productsRouter = express.Router();

productsRouter.get("/categories", getCategories);

productsRouter.delete("/:id", adminRequired, deleteProduct);

productsRouter.put("/:id", adminRequired, updateProduct);

productsRouter.get("/:id", getProductWithId);

productsRouter.get("/", getProducts);

productsRouter.post("/", adminRequired, addProduct);

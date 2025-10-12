import express from "express";
import {
  getProductWithId,
  deleteProduct,
  getProducts,
  addProduct,
  updateProduct,
  getProductCategories,
} from "../controllers/productsControllers.js";
import { adminRequired } from "../middleware/adminRequired.js";

export const productsRouter = express.Router();

productsRouter.get("/categories", getProductCategories);

productsRouter.get("/:id", getProductWithId);

productsRouter.delete("/:id", adminRequired, deleteProduct);

productsRouter.put("/:id", adminRequired, updateProduct);

productsRouter.get("/", getProducts);

productsRouter.post("/", adminRequired, addProduct);

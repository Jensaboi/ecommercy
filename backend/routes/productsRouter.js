import express from "express";
import {
  getProductWithId,
  deleteProduct,
  getAllProducts,
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

productsRouter.get("/", getAllProducts);

productsRouter.post("/", adminRequired, addProduct);

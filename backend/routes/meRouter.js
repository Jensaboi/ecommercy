import express from "express";
import {
  getUser,
  getWishlist,
  addToWishlist,
  deleteFromWishlistWithId,
} from "../controllers/meControllers.js";

export const meRouter = express.Router();

meRouter.delete("/wishlist/:id", deleteFromWishlistWithId);

meRouter.get("/wishlist", getWishlist);

meRouter.post("/wishlist", addToWishlist);

meRouter.get("/", getUser);

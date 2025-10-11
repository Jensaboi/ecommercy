import express from "express";
import { authRequired } from "../middleware/authRequired.js";
import {
  login,
  logout,
  register,
  deleteUser,
} from "../controllers/authControllers.js";
export const authRouter = express.Router();

authRouter.post("/login", login);

authRouter.post("/register", register);

//auth required
authRouter.post("/logout", authRequired, logout);

authRouter.delete("/delete", authRequired, deleteUser);

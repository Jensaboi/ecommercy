import "./config.js";
import express from "express";
import session from "express-session";
import cors from "cors";
import { randomUUID } from "crypto";
import "./listeners/orderListener.js";
import { productsRouter } from "./routes/productsRouter.js";
import { authRouter } from "./routes/authRouter.js";
import { cartRouter } from "./routes/cartRouter.js";
import { meRouter } from "./routes/meRouter.js";
import { authRequired } from "./middleware/authRequired.js";
import { checkoutRouter } from "./routes/checkoutRouter.js";
import { stripeRouter } from "./routes/stripeRouter.js";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // must be the exact origin, no *
    credentials: true, // allow cookies and credentials
  })
);

app.use(
  session({
    genid: randomUUID,
    secret: "supersecretkey", // must be secret, used to sign cookie
    resave: false, // don't save if session hasn't changed
    saveUninitialized: false, // don't create session until something stored
    cookie: {
      httpOnly: true, // client JS cannot read the cookie
      secure: false, // true in production (HTTPS only)
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

app.use("/api/stripe", stripeRouter);

app.use(express.json());

app.use("/public", express.static("public"));

app.use("/api/products", productsRouter);

app.use("/api/cart", cartRouter);

app.use("/api/auth/me", authRequired, meRouter);

app.use("/api/auth", authRouter);

app.use("/api/checkout", checkoutRouter);

app.listen(PORT, () =>
  console.log(`Server connected: Listening on port ${PORT}`)
);

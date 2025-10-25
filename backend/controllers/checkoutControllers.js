import Stripe from "stripe";
import { randomUUID } from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const DOMAIN_URL = process.env.DOMAIN_URL || "http://localhost:5173";

export async function createCheckoutSession(req, res) {
  const cart = req.body;

  const { userId } = req.session;
  const sid = req.session.id;

  const checkoutId = randomUUID();
  try {
    const items = cart.map(item => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      ui_mode: "custom",
      line_items: items,
      mode: "payment",
      return_url: `${DOMAIN_URL}/checkout/complete?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        checkoutId,
        userId: userId ?? null,
        sid,
      },
    });

    res.status(200).json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create checkout session" });
  }
}

export async function getSessionStatus(req, res) {
  const sessionId = req.query?.session_id || req.query?.sessionId;

  if (!sessionId) {
    return res.status(400).json({ message: "Missing session ID" });
  }

  try {
    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent"], // optional: fetch all items in session
    });

    res.status(200).json({
      status: session.status,
      payment_intent_id: session.payment_intent?.id || "",
      payment_status: session.payment_status,
      payment_intent_status: session.payment_intent?.status || "",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: "Failed to fetch session" });
  }
}

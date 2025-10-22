import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = "http://localhost:5173";

export async function createCheckoutSession(req, res) {
  console.log(req.body);
  const cart = req.body;

  let line_items = cart.map(item => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.name },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/checkout?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/checkout`,
    });

    res.status(200).json({ url: session.url });
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
      expand: ["line_items"], // optional: fetch all items in session
    });

    res.status(200).json(session);
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: "Failed to fetch session" });
  }
}

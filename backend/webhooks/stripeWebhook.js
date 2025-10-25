// stripeHandler.js

import { eventEmitter } from "../eventEmitter/eventEmitter.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function handlePayment(req, res) {
  if (!endpointSecret) {
    console.log(
      "Add STRIPE_WEBHOOK_SECRET to your .env file for handeling payments."
    );
  }

  let event;
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }

    // Handle the event
    console.log(event.type);
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        // Then define and call a method to handle the successful payment intent.
        console.log("succeeded");
        eventEmitter.emit("create-order", paymentIntent);

        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);

        break;

      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  // Return a res to acknowledge receipt of the event
  res.json({ received: true });
}

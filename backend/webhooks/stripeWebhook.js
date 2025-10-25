// stripeHandler.js
import eventEmitter from "../eventEmitter/eventEmitter.js";
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

    //console.log("event Obj", event);
    console.log("event type:", event.type);
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        // Then define and call a method to handle the successful payment intent.

        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);

        break;

      case "checkout.session.completed":
        const checkout = event.data.object;

        if (checkout.payment_status === "paid") {
          eventEmitter.emit("create-order", checkout);
        } else {
          console.log(
            `⚠️ Checkout session completed, payment status: ${checkout.payment_status}`
          );
        }

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  // Return a res to acknowledge receipt of the event
  res.json({ received: true });
}

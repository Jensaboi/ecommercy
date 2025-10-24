import { Outlet, useLoaderData } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { createCheckoutSession, fetchCart } from "../lib/api.js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export async function loader() {
  try {
    const cart = await fetchCart();

    const { clientSecret } = await createCheckoutSession(cart);

    return { clientSecret };
  } catch (err) {}
}

export default function StripeProvider() {
  const { clientSecret } = useLoaderData();

  const appearance = {
    theme: "stripe",
  };

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{
        clientSecret,
        elementsOptions: { appearance },
      }}
    >
      <Outlet />
    </CheckoutProvider>
  );
}

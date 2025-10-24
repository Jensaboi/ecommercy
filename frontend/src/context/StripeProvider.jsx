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
    theme: "stripe", // "stripe", "flat", "night" etc.
    variables: {
      colorPrimary: "#4f46e5",
      borderRadius: "8px",
      colorBackground: "#ffffff",
      colorText: "#1f2937",
      spacingUnit: "4px",
    },
    rules: {
      ".Input": {
        borderColor: "#d1d5db", // ✅ sets input border color
        borderWidth: "2px",
      },
      ".Input:focus": {
        borderColor: "#4f46e5", // border color when focused
      },
      ".Label": {
        color: "#374151",
      },
    },
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

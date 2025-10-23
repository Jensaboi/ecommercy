import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { useCart } from "./CartProvider";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function StripeProvider() {
  const { cart } = useCart();
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    if (!cart || cart.length === 0) return; // don't create session for empty cart

    const createSession = async () => {
      try {
        const res = await fetch("/api/checkout/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cart),
        });

        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Failed to create checkout session:", err);
      }
    };

    createSession();
  }, [cart]);

  if (!clientSecret) return <div>Loading payment...</div>; // show a loader

  return (
    <CheckoutProvider stripe={stripePromise} clientSecret={clientSecret}>
      <Outlet />
    </CheckoutProvider>
  );
}

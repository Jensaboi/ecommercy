import React, { useState } from "react";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout";

export default function Checkout() {
  const checkout = useCheckout(); // Get the Checkout object
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMessage("");

    if (!checkout.canConfirm) {
      setErrorMessage("Payment is not ready to be confirmed.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await checkout.confirm();
    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Payment</h4>
      <PaymentElement id="payment-element" />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <button type="submit" disabled={isSubmitting || !checkout.canConfirm}>
        {isSubmitting ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}

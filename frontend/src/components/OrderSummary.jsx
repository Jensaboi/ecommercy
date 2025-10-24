import React from "react";
import { useCheckout } from "@stripe/react-stripe-js/checkout";
import { useCart } from "../context/CartProvider";
import { IMG_BASE_URL } from "../lib/constants";

export default function OrderSummary() {
  const checkoutState = useCheckout();
  const { cart } = useCart();
  if (checkoutState.type === "loading") {
    // ... your loading component here
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (checkoutState.type === "error") {
    // ... your error component here
    return (
      <div>
        <h3>Error</h3>
      </div>
    );
  }

  const { currency, currencyOptions, lineItems, taxAmounts, total, recurring } =
    checkoutState.checkout;
  // ... your component here
  console.log("currency", currency);
  console.log("currencyOptions", currencyOptions);
  console.log("lineItems", lineItems);
  console.log("taxAmounts", taxAmounts);
  console.log("total", total.total.amount);
  console.log("recurring", recurring);
  return (
    <div className="p-4 border">
      <h2 className="text-lg font-semibold">Order summary</h2>
      <ul>
        {lineItems.map(item => {
          const cartItem = cart.find(ci => ci.name === item.name);

          return (
            <li className="flex items-center">
              <div className="size-20">
                <img
                  className="w-full h-full object-cover object-center"
                  src={IMG_BASE_URL + cartItem.images[0]}
                />
              </div>
              <div>
                <h3>{item.name}</h3>
                <p>{item.total.amount}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div>
        <div className="flex justify-between items-center">
          <h3>Total</h3>
          <p>{total.total.amount}</p>
        </div>
      </div>
    </div>
  );
}

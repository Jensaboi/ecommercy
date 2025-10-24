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

  console.log("currency", currency);
  console.log("currencyOptions", currencyOptions);
  console.log("lineItems", lineItems);
  console.log("taxAmounts", taxAmounts);
  console.log("total", total.total.amount);
  console.log("recurring", recurring);

  // ... your component here
  return (
    <div className="p-4 w-full flex flex-col gap-6">
      <h2 className="text-lg font-semibold">Summary</h2>
      <ul className="flex-1 overflow-y-scroll scrollbar-hidden hover:scroll">
        {lineItems.map(item => {
          const cartItem = cart.find(ci => ci.name === item.name);

          return (
            <li className="flex items-center gap-4">
              <div className="w-20 h-24 overflow-hidden rounded-sm">
                <img
                  className="w-full h-full object-cover object-center"
                  src={IMG_BASE_URL + cartItem?.images?.[0]}
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{item.name}</h3>
                <p>Price: {item.total.amount}</p>
                <p>
                  <span className="text">Quantity:</span>
                  {item.quantity}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="bg-dark-200 px-4 py-6 gap-4 flex flex-col rounded-sm text-bg-200">
        <div className="text-sm flex flex-col justify-between items-center">
          <span className="w-full flex justify-between">
            Currecny <span>{currency}</span>
          </span>

          <span className="w-full flex justify-between">
            Taxes <span>--</span>
          </span>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Total</h3>
          <p>{total.total.amount}</p>
        </div>
      </div>
    </div>
  );
}

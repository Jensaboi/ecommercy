import OrderSummary from "../components/OrderSummary";
import CheckoutForm from "../components/CheckoutForm";
import { useCart } from "../context/CartProvider";
import { useEffect } from "react";
import { useCheckout } from "@stripe/react-stripe-js/checkout";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { totalCartQuantity } = useCart();
  const navigate = useNavigate();

  const checkoutState = useCheckout();
  const isLoading = checkoutState.type === "loading";
  const lineItems = checkoutState?.checkout?.lineItems ?? [];
  const lineItemsTotalQuantity =
    lineItems?.reduce((acc, currItem) => acc + currItem.quantity, 0) ?? 0;

  useEffect(() => {
    if (!isLoading && totalCartQuantity !== lineItemsTotalQuantity) {
      navigate("/cart", { replace: true });
    }
  }, [totalCartQuantity, lineItemsTotalQuantity, checkoutState.type]);

  return (
    <section className="container mx-auto flex flex-col gap-6 md:flex-row border border-red-500">
      <OrderSummary />
      <CheckoutForm />
    </section>
  );
}

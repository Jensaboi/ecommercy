import OrderSummary from "../components/OrderSummary";
import CheckoutForm from "../components/CheckoutForm";

export default function Checkout() {
  return (
    <section className="container mx-auto flex flex-col gap-6 md:flex-row border border-red-500">
      <OrderSummary />
      <CheckoutForm />
    </section>
  );
}

import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { fetchCheckoutSession } from "../lib/api";
import { useCart } from "../context/CartProvider.jsx";

export async function loader({ request, params }) {
  const url = new URL(request.url);

  try {
    const session = await fetchCheckoutSession(url.search);

    return { session };
  } catch (err) {
    return { error: err.message };
  }
}

export default function Checkout() {
  const { session } = useLoaderData();
  const { deleteAllCartItems } = useCart();

  useEffect(() => {
    if (session?.payment_status === "paid") {
      deleteAllCartItems();
    }
  }, [session]);

  return (
    <section>
      <p>Successfull</p>
    </section>
  );
}

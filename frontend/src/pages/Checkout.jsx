import { fetchCart } from "../lib/api.js";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const cart = await fetchCart();
    return { cart };
  } catch (err) {}
}

export default function Checkout() {
  const { cart } = useLoaderData();
  console.log(cart);
  return (
    <div>
      <h1>Check out</h1>
    </div>
  );
}

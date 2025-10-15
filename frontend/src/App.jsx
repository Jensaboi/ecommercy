import { Outlet } from "react-router-dom";
import { fetchCategories } from "./lib/api";
import CartProvider from "./context/CartProvider";

export async function loader() {
  try {
    const categories = await fetchCategories();

    return { categories };
  } catch (err) {}
}

function App() {
  return (
    <>
      <CartProvider>
        <Outlet />
      </CartProvider>
    </>
  );
}

export default App;

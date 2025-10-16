import { Outlet } from "react-router-dom";
import { fetchCategories } from "./lib/api";
import CartProvider from "./context/CartProvider";
import UserProvider from "./context/UserProvider";

export async function loader() {
  try {
    const categories = await fetchCategories();

    return { categories };
  } catch (err) {}
}

function App() {
  return (
    <>
      <UserProvider>
        <CartProvider>
          <Outlet />
        </CartProvider>
      </UserProvider>
    </>
  );
}

export default App;

import {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { addToCart, fetchCart } from "../lib/api";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async signal => {
    setLoading(true);
    try {
      const data = await fetchCart(signal);

      setCart(data);

      return data;
    } catch (err) {
      if (err.name !== "AbortError") setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  const addAndUpdateCart = useCallback(async productId => {
    setLoading(true);
    try {
      await addToCart(productId);

      const updatedCart = await fetchCart();
      setCart(updatedCart);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, loading, error, addAndUpdateCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

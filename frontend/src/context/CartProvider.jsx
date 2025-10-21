import {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { addToCart, deleteCartItem, fetchCart } from "../lib/api";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async async => {
      setLoading(true);
      try {
        const data = await fetchCart();

        setCart(data);

        return data;
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        setLoading(false);
      }
    },
    [setCart, setError, setLoading]
  );

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItemFromCart = useCallback(
    async productId => {
      setLoading(true);
      try {
        const updatedCart = await deleteCartItem(productId);

        setCart(updatedCart);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [setCart, setError, setLoading]
  );

  const addItemToCart = useCallback(
    async productId => {
      setLoading(true);
      try {
        const updatedCart = await addToCart(productId);

        setCart(updatedCart);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [setCart, setError, setLoading]
  );

  const handleSetCart = useCallback(
    value => {
      setCart(value);
    },
    [setCart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        deleteItemFromCart,
        addItemToCart,
        reFetchCart: fetchData,
        handleSetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

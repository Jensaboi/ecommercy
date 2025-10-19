import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../context/UserProvider";
import { useCart } from "../context/CartProvider";

export default function Auth() {
  const { user, loading, error, handleSetUser } = useUser();
  const { reFetchCart } = useCart();

  useEffect(() => {
    reFetchCart();
  }, [user, reFetchCart]);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

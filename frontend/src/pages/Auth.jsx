import { Outlet, Navigate } from "react-router-dom";

import { useUser } from "../context/UserProvider";

export default function Auth() {
  const { user, loading, error } = useUser();

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

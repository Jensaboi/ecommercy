import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { fetchUser, logout } from "../lib/api";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      if (isMounted) setLoading(true);

      try {
        const user = await fetchUser();

        if (isMounted) setUser(user);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSetUser = useCallback(user => {
    setUser(user);
  }, []);

  const handleLogoutUser = useCallback(async () => {
    setLoading(true);
    try {
      await logout();

      setUser(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, error, handleSetUser, handleLogoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

import { createContext, useContext, useState, useCallback } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const handleSetUser = useCallback(user => {
    setUser(user);
  }, []);

  return (
    <UserContext.Provider value={{ user, handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

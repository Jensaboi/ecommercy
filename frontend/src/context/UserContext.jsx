import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function UserProvider() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}></UserContext.Provider>
  );
}

export const useUser = async () => useContext(UserContext);

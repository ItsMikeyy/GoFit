"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session.user) {
      setUser(session.user);
    }
  }, [session]);

  return (
    <UserContext.Provider value={ user }>
        {children}
    </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
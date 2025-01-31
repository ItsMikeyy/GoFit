"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() { 
      const res = await fetch("/api/user");
      const data = await res.json();
      if (data.error) {
          setUser(null);
      }
      else if (data.user && data.found) {
            setUser(data.user);
      }
      else {
        setUser(false);
      }
    }
    if (!user) {
      fetchUser();
    }
  }, [status, session, user]);

  return (
    <UserContext.Provider value={ user }>
        {children}
    </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
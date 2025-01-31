"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() { 
        const res = await fetch("/api/user");
        const data = await res.json();
        setUser(data.user);
    }
    if (session && session.user && !user) {
      fetchUser();
    }
    else {
    }

  }, [status, session, user]);

  return (
    <UserContext.Provider value={ user }>
        {children}
    </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
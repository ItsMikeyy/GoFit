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

//   useEffect(() => {
//     async function fetchUser() { 
//         const res = await fetch("/api/user");
//         const data = await res.json();
//         console.log(data);
//         setUser(data);
//     }
//     if (session && session.user) {
//         fetchUser();
//     }

//   }, [status, session]);


  return (
    <UserContext.Provider value={{ session, status }}>
        {children}
    </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
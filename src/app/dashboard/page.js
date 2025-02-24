"use client";
import { useUser } from "@/app/components/UserContext";
import { useSession } from "next-auth/react";
import { Title, Button, Container } from "@mantine/core";import { useEffect, useState } from "react";
import DailySummary from "@/app/components/DailySummary";
import MealPanel from "../components/meals/MealPanel";
import Workout from "../components/workouts/Workout";
import { useRouter } from "next/navigation";
export default function Dashboard() {
    const router = useRouter()
    const { data: session, status, update } = useSession();
    const [dbUser, setDbUser] = useState(session?.user?.dbUser)

  const [fetched, setFetched] = useState(false); 

  useEffect(() => {
      const fetchUser = async () => {
        if (!session.user.dbUser && !fetched) {
          setFetched(true); 
          const updatedSession = await update();   
          setDbUser(updatedSession?.user?.dbUser); 
        
        }
      };
      console.log("Call")
      fetchUser();
    }, [update, fetched]);

    if (status === "loading") return <p>Loading...</p>;
    if (!dbUser) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
    }

    return (
        <div>
            <DailySummary user={dbUser} />
            <MealPanel />
            <Workout />
        </div>
    );
    
    
}

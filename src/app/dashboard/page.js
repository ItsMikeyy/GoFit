"use client";
import { useUser } from "@/app/components/UserContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import DailySummary from "@/app/components/DailySummary";
import MealPanel from "../components/MealPanel";
import Workout from "../components/Workout";
import { useRouter } from "next/navigation";
export default function Dashboard() {
    console.log("render")
    const router = useRouter()
    const { data: session, status, update } = useSession();
    const user = useUser();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log(user)
        if (status === "unauthenticated") {
            router.push("/");
            return
        }
        
        const updateSession = async() => {
            await update();
            if (!session.user?.id && !user) {
                router.push("/welcome");
            }
            setLoading(false)
        }

        updateSession();
    },[]);



    if(user?.id) {
        return (
            <div>
                <DailySummary user={user} />
                <MealPanel />
                <Workout />
            </div>
        );
    }
    
}

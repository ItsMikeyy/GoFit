"use client";
import { useUser } from "@/app/components/UserContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DailySummary from "@/app/components/DailySummary";
export default function Dashboard() {
    const user = {
        age: 22,    
        email: "careyamichael2002@gmail.com",
        gender: "male",
        goalCalories: 3139,
        goalCarbs: 313,
        goalFat: 138,
        goalProtein: 160,
        height: 180,
        id: 1,
        name: "Michael",
        weight: 80
    };
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (status === "loading") return;
        
        if (!session) {
            router.push("/");
        } 
        else if (session && user === null) {
            setLoading(true); 
        } else if (session && user === false) {
            router.push("/welcome");
        } else if (session && user) {
            setLoading(false); 
        }
    }, [session, status, user, router]);

    console.log("Loading: ", loading);
    if (status === "loading" || loading) {
        return <div>Loading...</div>;
    }
    console.log("Loading: ", loading);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {user.name}</p>
            <DailySummary user={user}/>
        </div>
    );
}
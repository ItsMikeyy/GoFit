"use client";
import { useUser } from "@/app/components/UserContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import DailySummary from "@/app/components/DailySummary";
import MealPanel from "../components/MealPanel";
import Workout from "../components/Workout";
export default function Dashboard() {
    const { data: session, status, update } = useSession();
    const user = useUser();
    console.log(user)
    useEffect(() => {
        console.log("update");
        update();
        if (status === "unauthenticated") {
            redirect("/");
        }
    },[]);



    if (!user) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <DailySummary user={user} />
            <MealPanel />
            <Workout />
        </div>
    );
}
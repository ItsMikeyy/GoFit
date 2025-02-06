"use client";
import { useUser } from "@/app/components/UserContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import DailySummary from "@/app/components/DailySummary";
import MealPanel from "../components/MealPanel";
export default function Dashboard() {
    const { data: session, status, update } = useSession();
    useEffect(() => {
        update();
        if (status === "unauthenticated") {
            redirect("/");
        }
    },[]);
    const user = useUser();
    if (!user) return <p>Loading...</p>;
    return (
        <div>
            <DailySummary user={user} />
            <MealPanel />
        </div>
    );
}
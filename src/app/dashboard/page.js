"use client";
import { useUser } from "@/app/components/UserContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Dashboard() {
    const user = useUser();
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
            <p>{user.age}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </div>
    );
}
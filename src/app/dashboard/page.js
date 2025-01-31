"use client";

import { useUser } from "@/app/components/UserContext";
export default function Dashboard() {
    const user = useUser();
    console.log("useUser", user);
    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <p>{user.age}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </div>
    );
}
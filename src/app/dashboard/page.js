"use client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AccountInfoForm from "../components/AccountInfoForm";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUser } from "@/app/components/UserContext";
export default function Dashboard() {
    const user = useUser();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}
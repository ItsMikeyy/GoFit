"use client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AccountInfoForm from "../components/AccountInfoForm";
import { useEffect, useState } from "react";
export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function fetchUser() {
            fetch("/api/user")
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.error) {
                    setError(json.error);
                    setLoading(false);
                } else {
                    setUser(json.user);
                    setLoading(false);
                }
            })
            .catch(err => {
                setError("An error occurred");
                setLoading(false);
            });
        }
    }, []);
    if (loading) {
        return <p>Loading...</p>;
    }
    else if (error) {
        return <p>{error}</p>;
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <p>{user.name}</p>
        </div>
    )
}
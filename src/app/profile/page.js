"use client"
import { useUser } from "../components/UserContext";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
const Profile = () => {
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
}

export default Profile
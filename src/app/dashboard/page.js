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
    const user = useUser();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
            return
        }
        update()

        // const updateSession = async() => {
        //     if (!session.user?.id && !user) {
        //         router.push("/welcome");
        //     }
        //     setLoading(false)
        // }

        // updateSession();
    },[]);


    if (!user?.id) {
        return (
            <Container>
              <Title order={2} align="center" mb="md">
                Please fill out the form!
              </Title>
              <Button fullWidth>Form</Button>
            </Container>
        );
    }
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

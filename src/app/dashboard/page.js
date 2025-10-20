"use client";
import { useSession } from "next-auth/react";
import { Title, Button, Container, Box, Stack, Center, Loader, Text, Group, Card, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react";
import { IconBarbell, IconApple, IconChartLine, IconTrophy, IconCalendar, IconTarget } from "@tabler/icons-react";
import DailySummary from "@/app/components/DailySummary";
import MealPanel from "../components/meals/MealPanel";
import Workout from "../components/workouts/Workout";

export default function Dashboard() {
    const { data: session, status, update } = useSession();
    const [dbUser, setDbUser] = useState(session?.user?.dbUser);

    const [fetched, setFetched] = useState(false); 
    useEffect(() => {
        const fetchUser = async () => {
            const userData = localStorage.getItem("userSession");
            if(!userData && !session?.user?.dbUser && !fetched) {
                console.log("Fetch");
                setFetched(true); 
                const updatedSession = await update();   
                console.log(updatedSession);
                localStorage.setItem("userSession", JSON.stringify(updatedSession?.user?.dbUser));
                setDbUser(updatedSession?.user?.dbUser); 
            }
            else {
                console.log("Grab");
                const parsedUserData = JSON.parse(userData);
                setDbUser(parsedUserData);
            }
        };
        fetchUser();
    }, [update, fetched, session?.user?.dbUser]);

    if (status === "loading") {
        return (
            <Box
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Stack align="center" spacing="xl">
                    <Loader size="xl" color="white" />
                    <Text size="lg" style={{ color: "white" }}>
                        Loading your dashboard...
                    </Text>
                </Stack>
            </Box>
        );
    }

    if (!dbUser) {
        return (
            <Box
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Card
                    shadow="xl"
                    padding="xl"
                    radius="md"
                    style={{
                        background: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(10px)",
                        maxWidth: "500px",
                        textAlign: "center"
                    }}
                >
                    <Stack align="center" spacing="md">
                        <Loader size="lg" />
                        <Title order={3} style={{ color: "#667eea" }}>
                            Loading your data...
                        </Title>
                        <Text c="dimmed">
                            Please refresh if this is taking too long
                        </Text>
                        <Button
                            onClick={() => window.location.reload()}
                            style={{
                                background: "linear-gradient(45deg, #667eea, #764ba2)",
                                border: "none"
                            }}
                        >
                            Refresh Page
                        </Button>
                    </Stack>
                </Card>
            </Box>
        );
    }

    return (
        <Box
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
            }}
        >
            <Box
                style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    padding: "3rem 0 2rem 0",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                <Container size="lg">
                    <Stack align="center" spacing="xl" style={{ textAlign: "center" }}>
                        <Title 
                            order={1} 
                            size="3rem" 
                            weight={800}
                            style={{ 
                                color: "white",
                                textShadow: "0 4px 20px rgba(0,0,0,0.3)"
                            }}
                        >
                            Welcome back, {dbUser?.name || "Fitness Enthusiast"}!
                        </Title>
                        <Text 
                            size="xl" 
                            style={{ 
                                color: "rgba(255,255,255,0.9)",
                                maxWidth: "600px"
                            }}
                        >
                            Track your progress and stay on top of your fitness goals
                        </Text>
                    </Stack>
                </Container>
            </Box>

            <Container size="lg" style={{ paddingBottom: "3rem" }}>
                <Stack spacing="xl" mt="xl">
                    <DailySummary user={dbUser} />
                    <MealPanel />
                    <Workout />
                </Stack>
            </Container>
        </Box>
    );
}

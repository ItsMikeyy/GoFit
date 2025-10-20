"use client";
import { useEffect, useState } from "react";
import { Card, Text, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import WorkoutForm from "./WorkoutForm";
import ExerciseList from "./ExerciseList";
import { useDate } from "@/app/context/DateContext";

const Workout = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [workoutData, setWorkoutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { date } = useDate();
    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const res = await fetch(`/api/workout?date=${date}`);

                if (!res.ok) throw new Error("Failed to fetch workout");

                const data = await res.json();
                setWorkoutData(data.workout);
            } catch (err) {
                console.error(err);
                setError("Failed to load workout.");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkout();
    }, [date]);

    return (    
        <Card 
            shadow="xl" 
            padding="xl" 
            radius="md" 
            style={{ 
                marginTop: '20px',
                background: "white",
                border: "1px solid #e9ecef"
            }}
        >
            <Text size="xl">Workout</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text c="red">{error}</Text>
            ) : (
                <>
                    <Modal 
                        opened={opened} 
                        onClose={close} 
                        title="Add Workout"
                        size="lg"
                        centered
                        styles={{
                            modal: {
                                zIndex: 100,
                                background: "white"
                            },
                            overlay: {
                                zIndex: 200,
                                backgroundColor: "rgba(0, 0, 0, 0.5)"
                            },
                            header: {
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "white",
                                borderRadius: "8px 8px 0 0",
                                padding: "1rem 1.5rem"
                            },
                            content: {
                                borderRadius: "8px",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                                background: "white"
                            },
                            body: {
                                padding: "1.5rem",
                                background: "white"
                            }
                        }}
                    >
                        <WorkoutForm workout={workoutData} />
                    </Modal>
                    <ExerciseList workout={workoutData} />
                    <Button 
                        onClick={open} 
                        size="md" 
                        style={{ 
                            marginTop: '20px', 
                            minWidth: "120px",
                            background: "linear-gradient(45deg, #667eea, #764ba2)",
                            border: "none",
                            borderRadius: "25px",
                            fontWeight: 600,
                            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                            
                        }}
                    >
                        Add Workout
                    </Button>
                </>
            )}
        </Card> 
    );
};

export default Workout;

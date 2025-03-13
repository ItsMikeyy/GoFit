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
                console.log(data)
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
        <Card shadow="xs" padding="md" radius="md" style={{ marginTop: '20px' }}>
            <Text size="xl">Workout</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text c="red">{error}</Text>
            ) : (
                <>
                    <Modal opened={opened} onClose={close} title="Add Workout">
                        <WorkoutForm workout={workoutData} />
                    </Modal>
                    <ExerciseList workout={workoutData} />
                    <Button onClick={open} size="s" style={{ width: "5%", marginTop: '20px', minWidth: "100px" }}>
                        Add
                    </Button>
                </>
            )}
        </Card> 
    );
};

export default Workout;

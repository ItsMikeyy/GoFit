"use client";
import { useEffect } from "react";
import { Card, Text, Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import WorkoutForm from "./WorkoutForm";
import ExerciseList from "./ExerciseList";

const Workout = () => {
    const [opened, { open, close }] = useDisclosure(false);
    
    useEffect(() => {
        const fetchWorkout = async () => {
            await fetch("/api/workout")
        }
        fetchWorkout()

    }, [])

    return (    
        <Card shadow="xs" padding="md" radius="md" style={{ marginTop: '20px' }}>
            <Text size="xl">Workout</Text>
            <Modal opened={opened} onClose={close} title="Add Workout">
                <WorkoutForm />
            </Modal>
            <ExerciseList />
            <Button onClick={open} size='s' style={{ width: "5%", marginTop: '20px', minWidth: "100px"}}>Add</Button>

        </Card> 
    )
}

export default Workout;
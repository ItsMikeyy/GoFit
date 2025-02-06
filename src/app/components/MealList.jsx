"use client";
import { Card, Text } from "@mantine/core"
import { useEffect, useState } from "react";
const MealList = (props) => {
    const [meals, setMeals] = useState([])
    useEffect(() => {
        const fetchMeals = async() => {
            const res = await fetch("api/meal");
            const resData = await res.json();
            setMeals(resData.data);
        } 
        fetchMeals()
    }, [])
    return (
        <div>  
            <Text>Breakfast</Text>
            {meals.map((meal, id) => (
            <Card shadow="xs" padding="md" radius="md" style={{ marginTop: '20px' }}>
                <Text>{meal.name}</Text>
            </Card>
            ))}
            
            
        </div>
    );
}

export default MealList;
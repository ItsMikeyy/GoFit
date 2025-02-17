"use client";
import { Card, Text } from "@mantine/core"
import MealModal from "./MealModal";
import { useEffect, useState } from "react";
const MealList = (props) => {
    return (
        <>        
            <div>  
                <Text>{props.type}</Text>
                {props.meal
                .filter(meal => meal.type === props.type)
                .map((meal, id) => (
                    <Card key={id} shadow="xs" padding="md" radius="md" style={{ marginTop: '20px' }}>
                        <Text>{meal.name}</Text>
                    </Card>
                ))}
                
            </div>
            <MealModal type={props.type}/>
        </>
    );
}

export default MealList;
"use client";
import { useEffect, useState } from "react";
import { Button, TextInput, NumberInput, Box } from "@mantine/core";
import { useUser } from "./UserContext";
import formatDate from "../(tools)/formatdate";
const MealModalForm = ({ opened, onClose, onSubmit, type }) => {
    let [formData, setFormData] = useState({
        name: '',
        amount: '',
        servingSize: '',
        protein: '',
        carbs: '',
        fat: '',
        "type": type
    });
    const user = useUser();

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleNumberChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const calculateMacros = () => { 
        const data = {
            ...formData,
            protein: Math.floor((formData.protein * formData.amount) / formData.servingSize),
            carbs: Math.floor((formData.carbs * formData.amount) / formData.servingSize),
            fat: Math.floor((formData.fat * formData.amount) / formData.servingSize),
            calories: Math.floor(((formData.protein * 4) + (formData.carbs * 4) + (formData.fat * 9)) * formData.amount / formData.servingSize),
            date: formatDate(new Date())
        };
        return data;
    }


    const handleSubmit = async (e) => {
        const postData = calculateMacros();
        fetch("/api/meal", {method: "POST", body: JSON.stringify(postData)});
        console.log(postData);       
    };

    return (
        <form onSubmit={handleSubmit}>           
            <TextInput
                label="Meal Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <NumberInput
                label="Amount (units)"
                name="amount"
                value={formData.amount}
                onChange={(value) => handleNumberChange('amount', value)}
                required
            />
            <NumberInput
                label="Serving Size (units)"
                name="servingSize"
                value={formData.servingSize}
                onChange={(value) => handleNumberChange('servingSize', value)}
                required
            />
            <NumberInput
                label="Protein (g)"
                name="protein"
                value={formData.protein}
                onChange={(value) => handleNumberChange('protein', value)}
                required
            />
            <NumberInput
                label="Carbs (g)"
                name="carbs"
                value={formData.carbs}
                onChange={(value) => handleNumberChange('carbs', value)}
                required
            />
            <NumberInput
                label="Fat (g)"
                name="fat"
                value={formData.fat}
                onChange={(value) => handleNumberChange('fat', value)}
                required
            />
            
            <Box mt="md" style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit">Submit</Button>
            </Box>
        </form>
    );
};

export default MealModalForm;
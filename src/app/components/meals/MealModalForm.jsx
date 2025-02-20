"use client";
import { useState } from "react";
import { Button, TextInput, NumberInput, Box } from "@mantine/core";
import formatDate from "@/app/(tools)/formatdate";
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
    const [error, setError] = useState("");
    const [clicked, setClicked] = useState(false);

    
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
            protein: Math.floor((formData.protein * formData.amount) ),
            carbs: Math.floor((formData.carbs * formData.amount) ),
            fat: Math.floor((formData.fat * formData.amount)),
            calories: ((formData.protein * 4) + (formData.carbs * 4) + (formData.fat * 9)) * formData.amount,
            date: formatDate(new Date())
        };
        return data;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = calculateMacros();
        setClicked(true);
        const res = await fetch("/api/meal", {method: "POST", body: JSON.stringify(postData)});
        if (res.ok) {
            window.location.reload()
            setError("");
        } else {
            const data = await res.json()
            setError(data.message);
            setClicked(false);
        }
        window.location.reload();
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
                {!clicked ? <Button type="submit" fullWidth mt="md">Add Meal</Button> : <Button disabled type="submit" fullWidth mt="md">Submit</Button>}
                {error && <h1 className="p-4 text-red-700 text-center">Error</h1>}
            </Box>
        </form>
    );
};

export default MealModalForm;
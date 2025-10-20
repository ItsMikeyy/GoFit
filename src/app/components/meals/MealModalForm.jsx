"use client";
import { useState } from "react";
import { Button, TextInput, NumberInput, Box, Text } from "@mantine/core";
import { useDate } from "@/app/context/DateContext";
const MealModalForm = (props) => {

    let [formData, setFormData] = useState({
        name: '',
        amount: '',
        servingSize: '',
        protein: '',
        carbs: '',
        fat: '',
        "type": props.type
    });
    const [error, setError] = useState("");
    const [clicked, setClicked] = useState(false);
    const {date} = useDate();
    
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
            date: date
        };
        return data;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = calculateMacros();
        setClicked(true);
        const res = await fetch("/api/meal", {method: "POST", body: JSON.stringify(postData)});
        if (res.ok) {
            setError("");
            window.location.reload()
        } else {
            const data = await res.json()
            setError(data.message);
            setClicked(false);
        }
        
    };

    return (
        <Box style={{ background: "white", padding: "1rem" }}>
            <form onSubmit={handleSubmit}>           
                <TextInput
                    label="Meal Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    mb="md"
                    placeholder="Enter meal name"
                />
                <NumberInput
                    label="Amount (units)"
                    name="amount"
                    value={formData.amount}
                    onChange={(value) => handleNumberChange('amount', value)}
                    required
                    mb="md"
                    placeholder="Enter amount"
                />
                <NumberInput
                    label="Serving Size (units)"
                    name="servingSize"
                    value={formData.servingSize}
                    onChange={(value) => handleNumberChange('servingSize', value)}
                    required
                    mb="md"
                    placeholder="Enter serving size"
                />
                <NumberInput
                    label="Protein (g)"
                    name="protein"
                    value={formData.protein}
                    onChange={(value) => handleNumberChange('protein', value)}
                    required
                    mb="md"
                    placeholder="Enter protein grams"
                />
                <NumberInput
                    label="Carbs (g)"
                    name="carbs"
                    value={formData.carbs}
                    onChange={(value) => handleNumberChange('carbs', value)}
                    required
                    mb="md"
                    placeholder="Enter carbs grams"
                />
                <NumberInput
                    label="Fat (g)"
                    name="fat"
                    value={formData.fat}
                    onChange={(value) => handleNumberChange('fat', value)}
                    required
                    mb="md"
                    placeholder="Enter fat grams"
                />
                
                <Box mt="md" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {!clicked ? (
                        <Button 
                            type="submit" 
                            fullWidth 
                            size="md"
                            style={{
                                background: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
                                border: "none",
                                borderRadius: "25px",
                                fontWeight: 600,
                                boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)"
                            }}
                        >
                            Add Meal
                        </Button>
                    ) : (
                        <Button 
                            disabled 
                            type="submit" 
                            fullWidth 
                            size="md"
                            style={{
                                background: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
                                border: "none",
                                borderRadius: "25px",
                                fontWeight: 600,
                                opacity: 0.7
                            }}
                        >
                            Adding Meal...
                        </Button>
                    )}
                    {error && (
                        <Text c="red" size="sm" ta="center" style={{ padding: "0.5rem" }}>
                            {error}
                        </Text>
                    )}
                </Box>
            </form>
        </Box>
    );
};

export default MealModalForm;
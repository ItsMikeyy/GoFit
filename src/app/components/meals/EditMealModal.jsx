
"use client";
import { useEffect, useState } from "react";
import { Button, TextInput, NumberInput, Box, } from "@mantine/core";
import { useDate } from "@/app/context/DateContext";
const EditMealModal = (props) => {
    const {meal} = props
   
    let [formData, setFormData] = useState({
        ...meal
    });
    const [error, setError] = useState("");
    const [clicked, setClicked] = useState(false);
    const [action, setAction] = useState("")
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
        setClicked(true);
        let res;
        const macroData = calculateMacros();
        if (action === "edit") {
            res = await fetch("/api/meal", {method: "PATCH",
                body: JSON.stringify(macroData),
            })

        } else if (action === "delete") {
            console.log("Deleting meal...");
            res = await fetch("/api/meal", {method: "DELETE",
                body: JSON.stringify(macroData),
            })
        }
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
                    placeholder={meal.name}
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
                    placeholder={Math.floor(formData.protein / formData.amount)}
                    value={formData.protein}
                    onChange={(value) => handleNumberChange('protein', value)}
                    required
                />
                <NumberInput
                    label="Carbs (g)"
                    name="carbs"
                    placeholder={Math.floor(formData.carbs / formData.amount)}
                    value={formData.carbs}
                    onChange={(value) => handleNumberChange('carbs', value)}
                    required
                />
                <NumberInput
                    label="Fat (g)"
                    name="fat"
                    placeholder={Math.floor(formData.fat / formData.amount)}
                    value={formData.fat}
                    onChange={(value) => handleNumberChange('fat', value)}
                    required
                />
                
                <Box mt="md" style={{ display: 'flex', justifyContent: 'center' }}>
                    {!clicked ? <Button style={{margin: "10px"}} type="submit" onClick={() => setAction("edit")}fullWidth mt="md">Edit Meal</Button> : <Button disabled name="action" value="edit" style={{margin: "10px"}} type="submit" fullWidth mt="md">Edit Meal</Button>}
                    {!clicked ? <Button fullWidth style={{margin: "10px"}} type="submit" color="red" onClick={() => setAction("delete")} mt="md">Delete Meal</Button> : <Button disabled name="action" value="delete" color="red" style={{margin: "10px"}} type="submit" fullWidth mt="md">Delete Meal</Button>}
                    {error && <h1 className="p-4 text-red-700 text-center">Error</h1>}
                </Box>
            </form>
    );
}

export default EditMealModal;
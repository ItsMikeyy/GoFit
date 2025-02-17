"use client";
import { TextInput, NumberInput, Select, Button} from "@mantine/core"
import { useState } from "react"
const SimpleWorkoutInputs = () => {
    const [formData, setFormData] = useState({
        exerciseName: '',
        weight: '',
        unit: 'Pounds',
        reps: '',
        sets: '',
        type: "simple"
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch("/api/exercise", {method: "POST", body: JSON.stringify(formData)});
        window.location.reload();
    }

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
        <TextInput label="Workout Name" placeholder="Enter workout name" name="exerciseName" required onChange={handleTextChange} />
            <div className="flex gap-2 justify-between">
                <NumberInput label="Weight" placeholder="Enter weight" required mt="sm" name="weight" onChange={(value) => handleChange('weight', value)} />
                <Select
                    label="Unit"
                    placeholder="Unit"
                    data={["Pounds", "Kilograms"]}
                    required
                    mt="sm"
                    styles={{ input: { width: '100px' } }}
                    name = "unit"
                    onChange={(value) => handleChange('unit', value)}  

                />
            </div>
           
            <NumberInput label="Reps" placeholder="Enter reps" required mt="sm" name="reps" onChange={(value) => handleChange('reps', value)} />
            <NumberInput label="Sets" placeholder="Enter sets" required mt="sm" name="sets" onChange={(value) => handleChange('sets', value)}  />
            <Button type="submit" fullWidth mt="md">Add Workout</Button>
        </form>
    )
}

export default SimpleWorkoutInputs
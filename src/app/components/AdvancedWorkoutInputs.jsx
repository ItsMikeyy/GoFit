import { useState } from "react";
import { TextInput, NumberInput, Select, Button, Box, Group } from "@mantine/core";

const AdvancedWorkoutInputs = () => {
    const [formData, setFormData] = useState({
        sets: [{id: 1, weight: "", reps: ""}],
        exerciseName: "",
        unit: "",
        type: "advanced"
    })
    const addSet = () => {
        setFormData(prevState => ({
            ...prevState,
            sets: [...prevState.sets, { id: prevState.sets.length + 1, weight: "", reps: "" }]
        }));
    };
  
    const removeSet = (id) => {
        setFormData(prevState => ({
            ...prevState,
            sets: prevState.sets.filter(set => set.id !== id)
        }));
    };
  
    const handleChange = (id, field, value) => {
        setFormData(prevState => ({
          ...prevState,
          sets: prevState.sets.map((set) => 
            set.id === id ? { ...set, [field]: value } : set
          )
        }));
    };
    
    const handleNameChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleUnitChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        fetch("/api/exercise", {method: "POST", body: JSON.stringify(formData)});
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextInput label="Workout Name" placeholder="Enter workout name" required name="exerciseName" onChange={handleNameChange}/>
            <Select
            label="Unit"
            placeholder="Select unit"
            data={["Pounds", "Kilograms"]}
            required
            mt="sm"
            onChange={(value) => handleUnitChange('unit', value)}
            />

            {formData.sets.map((set, index) => (
            <div className="flex gap-2 justify-around items-end my-2">
                <NumberInput
                label={`Set ${index + 1} Weight`}
                placeholder="Enter weight"
                value={set.weight}
                onChange={(value) => handleChange(set.id, "weight", value)}
                required
                />
                <NumberInput
                label="Reps"
                placeholder="Enter reps"
                value={set.reps}
                onChange={(value) => handleChange(set.id, "reps", value)}
                required
                />
                <Button color="red" onClick={() => removeSet(set.id)}>-</Button>
            </div>
            ))}
            <Button mt="sm" onClick={addSet}>+ Add Set</Button>
            <Button type="submit" fullWidth mt="md">Submit</Button>
        </form>
    );
}

export default AdvancedWorkoutInputs;
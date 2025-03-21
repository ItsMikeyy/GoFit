import { useState } from "react";
import { TextInput, NumberInput, Select, Button, Box, Group } from "@mantine/core";
import { useDate } from "@/app/context/DateContext";

const EditAdvancedWorkout = (props) => {
    const {set, exercise} = props;
    console.log(set,exercise)
    const [formData, setFormData] = useState({
        sets: set.map(s => ({
            id: s.id,
            weight: s.weight,
            reps: s.reps,
        })),
        exerciseName: exercise.name,
        unit: exercise.unit,
        type: "advanced",
        exerciseId: exercise.id
    })

    const [error, setError] = useState("");
    const [clicked, setClicked] = useState(false);
    const {date} = useDate();
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
        setClicked(true);
        const res = await fetch(`/api/exercise/edit?date=${date}`, {method: "PATCH", body: JSON.stringify(formData)});
        if (res.ok) {
            window.location.reload()
            setError("");
        } else {
            const data = await res.json()
            setError(data.message);
            setClicked(false);
        }
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextInput value={formData.exerciseName} label="Workout Name" placeholder="Enter workout name" required name="exerciseName" onChange={handleNameChange}/>
            <Select
            label="Unit"
            placeholder="Select unit"
            value={formData.unit}
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
                {index + 1 != 1 ? <Button color="red" onClick={() => removeSet(set.id)}>-</Button> : <></>}
            </div>
            ))}
            <Button mt="sm" onClick={addSet}>+ Add Set</Button>
            <Box mt="md" style={{ display: 'flex', justifyContent: 'center' }}>
                {!clicked ? <Button type="submit" style={{margin: "10px"}}fullWidth mt="md">Edit Workout</Button> : <Button disabled type="submit" style={{margin: "10px"}} fullWidth mt="md">Edit Workout</Button>}
                {!clicked ? <Button type="submit" style={{margin: "10px"}} color="red" fullWidth mt="md">Delete Workout</Button> : <Button disabled type="submit" style={{margin: "10px"}} fullWidth mt="md">Delete Workout</Button>}
                {error && <h1 className="p-4 text-red-700 text-center">Error</h1>}
            </Box>
        </form>
    );
}

export default EditAdvancedWorkout;
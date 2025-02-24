"use client";
import { TextInput, NumberInput, Select, Button, Box} from "@mantine/core"
import { useState } from "react"

const EditSimpleWorkout = (props) => {
    const {set, exercise} = props;
    const [formData, setFormData] = useState({
            exerciseName: exercise.name,
            weight: set.weight,
            unit: exercise.unit,
            reps: set.reps,
            sets: exercise.sets,
            type: "simple"
        });
    
    const [error, setError] = useState("");
    const [clicked, setClicked] = useState(false);
    const [action, setAction] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()
        setClicked(true);
        if (action === "edit") {
            console.log("edit", formData)
        }
        else if (action === "delete") {
            console.log("delete", formData)
        }
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
        <TextInput label="Workout Name" placeholder={formData.exerciseName} name="exerciseName" required onChange={handleTextChange} />
            <div className="flex gap-2 justify-between">
                <NumberInput label="Weight" placeholder={formData.weight} required mt="sm" name="weight" onChange={(value) => handleChange('weight', value)} />
                <Select
                    label="Unit"
                    placeholder={formData.unit}
                    data={["Pounds", "Kilograms"]}
                    required
                    mt="sm"
                    styles={{ input: { width: '100px' } }}
                    name = "unit"
                    onChange={(value) => handleChange('unit', value)}  

                />
            </div>
            
            <NumberInput label="Reps" placeholder={formData.reps} required mt="sm" name="reps" onChange={(value) => handleChange('reps', value)} />
            <NumberInput label="Sets" placeholder={formData.sets} required mt="sm" name="sets" onChange={(value) => handleChange('sets', value)}  />
             <Box mt="md" style={{ display: 'flex', justifyContent: 'center' }}>
                {!clicked ? <Button style={{margin: "10px"}} type="submit" onClick={() => setAction("edit")}fullWidth mt="md">Edit Workout</Button> : <Button disabled name="action" value="edit" style={{margin: "10px"}} type="submit" fullWidth mt="md">Edit Workout</Button>}
                {!clicked ? <Button fullWidth style={{margin: "10px"}} type="submit" color="red" onClick={() => setAction("delete")} mt="md">Delete Workout</Button> : <Button disabled name="action" value="delete" color="red" style={{margin: "10px"}} type="submit" fullWidth mt="md">Delete Workout</Button>}
                {error && <h1 className="p-4 text-red-700 text-center">Error</h1>}
            </Box>
            {error && <h1 className="p-4 text-red-700 text-center">Error</h1>}
        </form>
    )
}

export default EditSimpleWorkout
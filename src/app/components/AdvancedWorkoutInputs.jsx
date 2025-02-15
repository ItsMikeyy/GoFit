import { useState } from "react";
import { TextInput, NumberInput, Select, Button, Box, Group } from "@mantine/core";

const AdvancedWorkoutInputs = () => {
    const [sets, setSets] = useState([{ id: 1, weight: "", reps: "" }]);

    const addSet = () => {
      setSets([...sets, { id: sets.length + 1, weight: "", reps: "" }]);
    };
  
    const removeSet = (id) => {
      setSets(sets.filter((set) => set.id !== id));
    };
  
    const handleChange = (id, field, value) => {
      setSets(
        sets.map((set) => (set.id === id ? { ...set, [field]: value } : set))
      );
    };
  
    return (
        <form>
            <TextInput label="Workout Name" placeholder="Enter workout name" required />
            <Select
            label="Unit"
            placeholder="Select unit"
            data={["Pounds", "Kilograms"]}
            required
            mt="sm"
            />

            {sets.map((set, index) => (
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
            <Button fullWidth mt="md">Submit</Button>
        </form>
    );
}

export default AdvancedWorkoutInputs;
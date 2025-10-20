"use client";
import { useDate } from "@/app/context/DateContext";
import { TextInput, NumberInput, Select, Button, Box, Text} from "@mantine/core"
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

    const [error, setError] = useState("");
    const [clicked, setClicked] = useState(false);
    const {date} = useDate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setClicked(true);
        const res = await fetch(`/api/exercise?date=${date}`, {method: "POST", body: JSON.stringify(formData)});
        if (res.ok) {
            window.location.reload()
            setError("");
        } else {
            const data = await res.json()
            setError(data.message);
            setClicked(false);
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
        <Box style={{ background: "white", padding: "1rem" }}>
            <form onSubmit={handleSubmit}>
                <TextInput 
                    label="Workout Name" 
                    placeholder="Enter workout name" 
                    name="exerciseName" 
                    required 
                    onChange={handleTextChange}
                    mb="md"
                />
                <Box style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <NumberInput 
                        label="Weight" 
                        placeholder="Enter weight" 
                        required 
                        name="weight" 
                        onChange={(value) => handleChange('weight', value)}
                        style={{ flex: 1 }}
                    />
                    <Select
                        label="Unit"
                        placeholder="Unit"
                        data={["Pounds", "Kilograms"]}
                        required
                        name="unit"
                        onChange={(value) => handleChange('unit', value)}
                        style={{ flex: 1 }}
                    />
                </Box>
               
                <NumberInput 
                    label="Reps" 
                    placeholder="Enter reps" 
                    required 
                    name="reps" 
                    onChange={(value) => handleChange('reps', value)}
                    mb="md"
                />
                <NumberInput 
                    label="Sets" 
                    placeholder="Enter sets" 
                    required 
                    name="sets" 
                    onChange={(value) => handleChange('sets', value)}
                    mb="md"
                />
                
                <Box mt="md" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {!clicked ? (
                        <Button 
                            type="submit" 
                            fullWidth 
                            size="md"
                            style={{
                                background: "linear-gradient(45deg, #667eea, #764ba2)",
                                border: "none",
                                borderRadius: "25px",
                                fontWeight: 600,
                                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)"
                            }}
                        >
                            Add Workout
                        </Button>
                    ) : (
                        <Button 
                            disabled 
                            type="submit" 
                            fullWidth 
                            size="md"
                            style={{
                                background: "linear-gradient(45deg, #667eea, #764ba2)",
                                border: "none",
                                borderRadius: "25px",
                                fontWeight: 600,
                                opacity: 0.7
                            }}
                        >
                            Adding Workout...
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
    )
}

export default SimpleWorkoutInputs
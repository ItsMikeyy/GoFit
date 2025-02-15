import { TextInput, NumberInput, Select, Button} from "@mantine/core"
const SimpleWorkoutInputs = () => {
    return (
        <form>
            <TextInput label="Workout Name" placeholder="Enter workout name" required />
            <div className="flex gap-2 justify-between">
                <NumberInput label="Weight" placeholder="Enter weight" required mt="sm" />
                <Select
                    label="Unit"
                    placeholder="Unit"
                    data={["Pounds", "Kilograms"]}
                    required
                    mt="sm"
                    styles={{ input: { width: '100px' } }}
                />
            </div>
           
            <NumberInput label="Reps" placeholder="Enter reps" required mt="sm" />
            <NumberInput label="Sets" placeholder="Enter sets" required mt="sm" />
            <Button fullWidth mt="md">Add Workout</Button>
        </form>
    )
}

export default SimpleWorkoutInputs
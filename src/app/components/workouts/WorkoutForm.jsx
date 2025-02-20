import { Tabs } from "@mantine/core";
import SimpleWorkoutInputs from "./SimpleWorkoutInputs";
import AdvancedWorkoutInputs from "./AdvancedWorkoutInputs";

const WorkoutForm = () => {
    return (
        <Tabs variant="pills" defaultValue="simple">
            <Tabs.List justify='center'>
                <Tabs.Tab value="simple">Simple</Tabs.Tab>
                <Tabs.Tab value="advanced">Advanced</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="simple">
                <SimpleWorkoutInputs />
            </Tabs.Panel>

            <Tabs.Panel value="advanced">
                <AdvancedWorkoutInputs />
            </Tabs.Panel>
        </Tabs>
    )
}

export default WorkoutForm;
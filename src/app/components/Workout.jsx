import { Card, Text, Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import WorkoutForm from "./WorkoutForm";

const Workout = () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        
        <Card shadow="xs" padding="md" radius="md" style={{ marginTop: '20px' }}>
            <Text size="xl">Workout</Text>
            <Button onClick={open} size='s' style={{ width: "5%", marginTop: '20px', minWidth: "100px"}}>Add</Button>
            <Modal opened={opened} onClose={close} title="Add Workout">
                <WorkoutForm />
            </Modal>
        </Card> 
    )
}

export default Workout;
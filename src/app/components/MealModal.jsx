import { Modal, Text, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MealModalForm from "./MealModalForm";
const MealModal = (props) => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
        <Modal opened={opened} onClose={close} title="Add Meal">
            <MealModalForm type={props.type}/>
        </Modal>
  
        <Button onClick={open} size='s' style={{ width: "5%", marginTop: '20px', minWidth: "100px"}}>Add</Button>
      </>
    );
}

export default MealModal;
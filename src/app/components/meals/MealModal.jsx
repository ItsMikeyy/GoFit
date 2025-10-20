import { Modal, Text, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MealModalForm from "./MealModalForm";
const MealModal = (props) => {
    const [opened, { open, close }] = useDisclosure(false);
   
    return (
        <>
        <Modal 
            opened={opened} 
            onClose={close} 
            title="Add Meal"
            size="lg"
            centered
            styles={{
                modal: {
                    zIndex: 100,
                    background: "white"
                },
                overlay: {
                    zIndex: 200,
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                },
                header: {
                    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
                    color: "white",
                    borderRadius: "8px 8px 0 0",
                    padding: "1rem 1.5rem"
                },
                content: {
                    borderRadius: "8px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    background: "white"
                },
                body: {
                    padding: "1.5rem",
                    background: "white"
                }
            }}
        >
            <MealModalForm type={props.type} />
        </Modal>
  
        <Button 
            onClick={open} 
            size="md" 
            style={{ 
                marginTop: '20px', 
                minWidth: "120px",
                background: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
                border: "none",
                borderRadius: "25px",
                fontWeight: 600,
                boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(255, 107, 107, 0.4)"
                }
            }}
        >
            Add Meal
        </Button>
      </>
    );
}

export default MealModal;
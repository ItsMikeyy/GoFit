import { useState } from "react";
import { Card, Text, Collapse, Progress, Flex, Button, Modal } from "@mantine/core";
import MealModal from "./MealModal";
import EditMealModal from "./EditMealModal";
import { useDisclosure } from "@mantine/hooks";

export default function MealList(props) {
  const [expanded, setExpanded] = useState(null);
  const [meal, setMeal] = useState(null)
  const [opened, { open, close }] = useDisclosure(false);
  
  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  }
  const handleEdit = (meal) => {
    setMeal(meal)
    open()
  }
  return (
    <>        
        {props.meal
          .filter(meal => meal.type === props.type)
          .map((meal, id) => (
            <Card 
                onClick={()=>handleExpand(id)} 
                key={id} 
                shadow="sm" 
                padding="md" 
                radius="md" 
                style={{ 
                    marginTop: '10px',
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }
                }}
            >
              <Text size="lg" style={{ cursor: "pointer" }}>{meal.name}</Text>
              {expanded === id &&
              <Collapse in={true}>
                <Text size="md">Calories: {meal.calories}</Text> 
                <Flex align="center" justify="space-between" direction="row">
                    <Text style={{ minWidth: "100px" }} size="sm">Protein: {meal.protein}g</Text> 
                    <Progress color="red" style={{ flex: 1, margin: '0 10px' }} value={((meal.protein * 4) / meal.calories) * 100}></Progress>
                    <Text size="sm">{Math.round((meal.fat * 4/ meal.calories) * 1000) / 10}%</Text>
                </Flex>  

                <Flex align="center" justify="space-between" direction="row">
                    <Text style={{ minWidth: "100px" }} size="sm">Carbs: {meal.carbs}g</Text> 
                    <Progress color="orange" style={{ flex: 1, margin: '0 10px' }} value={((meal.carbs * 4) / meal.calories) * 100}></Progress>
                    <Text size="sm">{Math.round((meal.carbs * 4 / meal.calories) * 1000) / 10}%</Text>
                </Flex>  

                <Flex align="center" justify="space-between" direction="row">
                    <Text style={{ minWidth: "100px" }} size="sm">Fat: {meal.fat}g</Text> 
                    <Progress  style={{ flex: 1, margin: '0 10px' }} value={((meal.fat * 9) / meal.calories) * 100}></Progress>
                    <Text size="sm">{Math.round((meal.fat * 9 / meal.calories) * 1000) / 10}%</Text>
                </Flex>  
                <Button 
                    onClick={() => handleEdit(meal)} 
                    size="sm"
                    style={{
                        margin: "10px 0",
                        background: "linear-gradient(45deg, #667eea, #764ba2)",
                        border: "none",
                        borderRadius: "20px",
                        fontWeight: 500,
                        boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)"
                    }}
                >
                    Edit
                </Button>

              </Collapse>    
              }
            </Card>
          ))}
      
      {meal && 
        <Modal 
            opened={opened} 
            onClose={close} 
            title="Edit Meal"
            size="lg"
            centered
            styles={{
                modal: {
                    zIndex: 2000,
                    background: "white"
                },
                overlay: {
                    zIndex: 1999,
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                },
                header: {
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
            <EditMealModal meal={meal} />
        </Modal>
      }
      <MealModal type={props.type}/>
    </>
  );
}

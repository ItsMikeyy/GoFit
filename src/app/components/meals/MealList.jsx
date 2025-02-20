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
            <Card onClick={()=>handleExpand(id)} key={id} shadow="xs" padding="md" radius="md" style={{ marginTop: '10px' }}>
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
                <Button onClick={() => handleEdit(meal)} style={{margin: "10px 0"}}>Edit</Button>

              </Collapse>    
              }
            </Card>
          ))}
      
      {meal && 
        <Modal opened={opened} onClose={close} title="Edit Meal">
            <EditMealModal meal={meal} />
        </Modal>
      }
      <MealModal type={props.type}/>
    </>
  );
}

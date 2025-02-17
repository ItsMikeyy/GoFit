import { useState } from "react";
import { Card, Text, Collapse } from "@mantine/core";
import MealModal from "./MealModal";

export default function MealList(props) {
  const [opened, setOpened] = useState(false);

  return (
    <>        
        {props.meal
          .filter(meal => meal.type === props.type)
          .map((meal, id) => (
            <Card key={id} shadow="xs" padding="md" radius="md" style={{ marginTop: '10px' }}>
              <Text  onClick={() => setOpened((prev) => !prev)}  style={{ cursor: "pointer" }}>{meal.name}</Text>
              <Collapse in={opened}>
                <Text size="sm">Calories: {meal.calories}</Text>
                <Text size="sm">Protein: {meal.protein}g</Text>
                <Text size="sm">Carbs: {meal.carbs}g</Text>
                <Text size="sm">Fat: {meal.fat}g</Text>
                </Collapse>
            </Card>
          ))}
      

      <MealModal type={props.type}/>
    </>
  );
}

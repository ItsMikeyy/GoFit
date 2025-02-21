import { useEffect, useState } from "react";
import { Card, Text, Group, Badge } from "@mantine/core";
import formatDate from "@/app/(tools)/formatdate";
const ExerciseList = () => {
    const [exercises, setExercies] = useState([])
    const [expand, setExpand] = useState(null);
    useEffect(()=> {
        const fetchWorkoutData = async () => {
            const date = formatDate(new Date())
            const res = await fetch(`/api/exercise?date=${date}`);
            const exerciseData = await res.json();
            console.log(exerciseData)
            setExercies(exerciseData.data);
        }

        fetchWorkoutData();
    }, []);

    const handleExpand = (id) => {
        setExpand(expand === id ? null : id);
      };


    return (
        <div className="my-2">
          {exercises.map(({ exercise, sets }) => (
            <Card
              key={exercise.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ marginBottom: "20px", cursor: "pointer" }}
              onClick={() => handleExpand(exercise.id)}
            >
              <Text weight={500} size="lg">{exercise.name}</Text>
              
              <Group mt="sm">
                <Badge color="blue">{exercise.sets} Set(s)</Badge>
              </Group>
    
              {expand === exercise.id && (
                <div style={{ marginTop: "10px" }}>
                  {sets.map((set, index) => (
                    <Card key={set.id} shadow="xs" padding="md" radius="md" style={{ marginTop: "10px" }}>
                      <Text>{set.setOrder != 0 ? "" : exercise.sets + "x"} Set {set.setOrder != 0 ? index + 1 : ""}: {set.weight} {exercise.unit === "Pounds" ? "lbs" : "kg"} × {set.reps} reps</Text>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      );
}

export default ExerciseList;
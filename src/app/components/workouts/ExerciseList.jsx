import { useEffect, useState } from "react";
import { Card, Text, Group, Badge, Button, Modal } from "@mantine/core";
import formatDate from "@/app/(tools)/formatdate";
import { useDisclosure } from "@mantine/hooks";
import EditSimpleWorkout from "./EditSimpleWorkout";
const ExerciseList = () => {
    const [exercises, setExercies] = useState([])
    const [expand, setExpand] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [attempts, setAttempts] = useState(0);
    const [editExercise, setEditExercise] = useState(null); 
    const [editSet, setEditSet] = useState(null); 
    const [opened, { open, close }] = useDisclosure(false);
    
    useEffect(() => {
      let intervalId;
      
      const fetchWorkoutLog = async () => {
        try {
          const date = formatDate(new Date())
          const res = await fetch(`/api/exercise?date=${date}`);
          if (!res.ok) throw new Error("Failed to fetch workout log");
  
          const data = await res.json();
  
          if (data.data) {
            setExercies(data.data)
            setLoading(false);
            clearInterval(intervalId); 
          } else {
            throw new Error("No workout log found yet");
          }
        } catch (err) {
          setAttempts((prev) => prev + 1);
  
          if (attempts >= 4) {
            setError("Failed to load workout log. Please try again later.");
            setLoading(false);
            clearInterval(intervalId); 
          }
        }
      };
      fetchWorkoutLog(); 
    intervalId = setInterval(fetchWorkoutLog, 3000); 

    return () => clearInterval(intervalId); 
  }, [attempts]); 
    

    const handleEdit = (set, exercise) => {
      setEditExercise(exercise)
      setEditSet(set)
      open()
    } 


    const handleExpand = (id) => {
        setExpand(expand === id ? null : id);
      };


    return (
      <>
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
                    <>
                      <Card key={set.id} shadow="xs" padding="md" radius="md" style={{ marginTop: "10px" }}>
                        <Text>{set.setOrder != 0 ? "" : exercise.sets + "x"} Set {set.setOrder != 0 ? index + 1 : ""}: {set.weight} {exercise.unit === "Pounds" ? "lbs" : "kg"} × {set.reps} reps</Text>
                      </Card>
                      <Button onClick={() => handleEdit(set, exercise)} style={{margin: "10px 0"}}>Edit</Button>
                    </>
                  ))}
                </div>
                
              )}
            </Card>
          ))}
        </div>
        {editExercise && editSet &&
        <Modal opened={opened} onClose={close} title="Edit Workout">
          <EditSimpleWorkout set={editSet} exercise={editExercise}/>
        </Modal>
        }
      </>
    );
}

export default ExerciseList;
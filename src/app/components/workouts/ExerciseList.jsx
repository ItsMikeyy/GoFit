import { useEffect, useState } from "react";
import { Card, Text, Group, Badge, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import EditSimpleWorkout from "./EditSimpleWorkout";
import { useDate } from "@/app/context/DateContext";
import EditAdvancedWorkout from "./EditAdvancedWorkout";
const ExerciseList = (props) => {
    const [exercises, setExercies] = useState([])
    const [expand, setExpand] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editExercise, setEditExercise] = useState(null); 
    const [editSet, setEditSet] = useState(null); 
    const [opened, { open, close }] = useDisclosure(false);
    const { date } = useDate();

    useEffect(() => {
      const fetchWorkoutLog = async () => {
        try {
          const res = await fetch(`/api/exercise?date=${date}`);
          if (!res.ok) throw new Error("Failed to fetch workout log");
    
          const data = await res.json();
          if (data.data) {
            setExercies(data.data);
            setLoading(false);
          } else {
            throw new Error("No workout log found yet");
          }
        } catch (err) {
          console.error(err);
          setError("Failed to load workout.");
        }
        finally {
          setLoading(false);
      }
    };
    console.log(props.workout)
      if (props.workout) {
        console.log(props.workout)
        fetchWorkoutLog()
      }
    }, [date, props.workout]); 
    

    const handleEdit = (set, exercise) => {
      console.log("set", set)
      console.log("exercise", exercise)
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
                      
                    </>
                  ))}
                  <Button onClick={() => handleEdit(sets, exercise)} style={{margin: "10px 0"}}>Edit</Button>
                </div>
                
              )}
            </Card>
          ))}
        </div>
        {(editExercise && editSet && editSet[0].setOrder === 0) ?
          <Modal opened={opened} onClose={close} title="Edit Workout">
            <EditSimpleWorkout set={editSet[0]} exercise={editExercise}/>
          </Modal> :
          <Modal opened={opened} onClose={close} title="Edit Workout">
            <EditAdvancedWorkout set={editSet} exercise={editExercise}/>
          </Modal> 
        }
      </>
    );
}

export default ExerciseList;
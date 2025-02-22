import { useEffect, useState } from "react";
import { Card, Text, Group, Badge } from "@mantine/core";
import formatDate from "@/app/(tools)/formatdate";
const ExerciseList = () => {
    const [exercises, setExercies] = useState([])
    const [expand, setExpand] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [attempts, setAttempts] = useState(0);  
    
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
            clearInterval(intervalId); // Stop polling once log is found
          } else {
            throw new Error("No workout log found yet");
          }
        } catch (err) {
          setAttempts((prev) => prev + 1);
  
          if (attempts >= 4) {
            setError("Failed to load workout log. Please try again later.");
            setLoading(false);
            clearInterval(intervalId); // Stop polling after 5 attempts
          }
        }
      };
      fetchWorkoutLog(); // Initial call
    intervalId = setInterval(fetchWorkoutLog, 3000); // Poll every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [attempts]); // Depend on `attempts` to stop when limit is reached
    
    // useEffect(()=> {
    //     const fetchWorkoutData = async () => {
            
            
    //         const exerciseData = await res.json();
    //         console.log(exerciseData)
    //         setExercies(exerciseData.data);
    //     }

    //     fetchWorkoutData();
    // }, []);

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
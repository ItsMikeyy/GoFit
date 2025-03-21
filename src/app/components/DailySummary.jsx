"use client";
import { Card, Text, Grid, Box, Flex, Progress, RingProgress, } from "@mantine/core";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks"; 
import { useDate } from "../context/DateContext";

const DailySummary = (props) => {
    const [nutrition, setNutrition] = useState({});
    const [loading, setLoading] = useState(true);
    const { date, setDate } = useDate();
    const isSmallScreen = useMediaQuery('(max-width: 768px)'); 

    useEffect(() => {
        let retries = 0;
        const maxRetries = 5; 
        const interval = 3000; 

        const fetchNutrition = async () => {
            try {
                const res = await fetch(`/api/nutrition?date=${date}`);
                const data = await res.json();
                
                if (data.nutrition) {
                    setNutrition(data.nutrition);
                    setLoading(false);
                } else if (retries < maxRetries) {
                    retries++;
                    setTimeout(fetchNutrition, interval); 
                } else {
                    setLoading(false); 
                }
            } catch (error) {
                console.error("Error fetching nutrition:", error);
                setLoading(false);
            }
        };

        fetchNutrition();
    }, [date]); 

    const handleDateChange = (e) => {
        console.log(e.target.value)
        setDate(e.target.value)
    }

    if (loading) return <p>Loading...</p>;
    if (!nutrition) return <p>Something went wrong..</p>;

    const proteinPercent = (nutrition.protein / props.user.goalProtein) * 100;
    const carbsPercent = (nutrition.carbs / props.user.goalCarbs) * 100;
    const fatPercent = (nutrition.fat / props.user.goalFat) * 100;

    const proteinCaloriesPercentage = ((nutrition.protein * 4) / props.user.goalCalories) * 100;
    const carbsCaloriesPercentage = ((nutrition.carbs * 4) / props.user.goalCalories) * 100;
    const fatCaloriesPercentage = ((nutrition.fat * 9) / props.user.goalCalories) * 100;
    return (
        <Card shadow="xs" padding="md" radius="md">
            <Flex direction="column" gap="xl">
                <Flex justify="space-between" align="center" wrap="wrap">
                    <Text size="xl">Daily Summary</Text>
                    <input type="date" max={date} onChange={handleDateChange} value={date} />
                </Flex>

                {isSmallScreen && (
                    <Flex justify="center">
                        <RingProgress 
                            size={180} 
                            thickness={12}
                            label={<Text fw={700} ta="center" size="md">{nutrition.calories} / {props.user.goalCalories} Calories</Text>} 
                            sections={[
                                { value: proteinCaloriesPercentage, color: 'red' },
                                { value: carbsCaloriesPercentage, color: 'orange' },
                                { value: fatCaloriesPercentage, color: 'blue' },
                            ]} 
                        />
                    </Flex>
                )}

                <Flex 
                    direction={isSmallScreen ? "column" : "row"} 
                    align="center" 
                    gap="xl"
                    justify="center"
                >
                    {!isSmallScreen && (
                        <Flex justify="center">
                            <RingProgress 
                                size={150} 
                                label={<Text fw={700} ta="center" size="sm">{nutrition.calories} / {props.user.goalCalories} Calories</Text>} 
                                sections={[
                                    { value: proteinCaloriesPercentage, color: 'red' },
                                    { value: carbsCaloriesPercentage, color: 'orange' },
                                    { value: fatCaloriesPercentage, color: 'blue' },
                                ]} 
                            />
                        </Flex>
                    )}

                    <Grid gutter="md" style={{ flex: 1 }}>
                        <Grid.Col xs={12}>
                            <Box padding="sm">
                                <Flex align="center" justify="space-between" wrap="wrap">
                                    <Text size="lg" style={{ minWidth: "120px" }}>Protein</Text>
                                    <Progress color="red" value={proteinPercent} style={{ flex: 1, margin: '0 10px' }} />
                                    <Text size="sm">{nutrition.protein}g / {props.user.goalProtein}g</Text>
                                </Flex>
                            </Box>
                        </Grid.Col>

                        <Grid.Col xs={12}>
                            <Box padding="sm">
                                <Flex align="center" justify="space-between" wrap="wrap">
                                    <Text size="lg" style={{ minWidth: "120px" }}>Carbohydrates</Text>
                                    <Progress color="orange" value={carbsPercent} style={{ flex: 1, margin: '0 10px' }} />
                                    <Text size="sm">{nutrition.carbs}g / {props.user.goalCarbs}g</Text>
                                </Flex>
                            </Box>
                        </Grid.Col>

                        <Grid.Col xs={12}>
                            <Box padding="sm">
                                <Flex align="center" justify="space-between" wrap="wrap">
                                    <Text size="lg" style={{ minWidth: "120px" }}>Fat</Text>
                                    <Progress value={fatPercent} style={{ flex: 1, margin: '0 10px' }} />
                                    <Text size="sm">{nutrition.fat}g / {props.user.goalFat}g</Text>
                                </Flex>
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Flex>
            </Flex>                                  
        </Card>
    );
};

export default DailySummary;

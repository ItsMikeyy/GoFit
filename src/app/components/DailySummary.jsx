"use client";
import { Card, Text, Grid, Box, Flex, Progress, RingProgress } from "@mantine/core";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks"; 
import formatDate from "../(tools)/formatdate";

const DailySummary = (props) => {
    const [nutrition, setNutrition] = useState({});
    const [loading, setLoading] = useState(true);
    const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Check screen size

    useEffect(() => {
        let retries = 0;
        const maxRetries = 5; // Stop polling after 5 attempts
        const interval = 3000; // Try every 3 seconds

        const fetchNutrition = async () => {
            try {
                const res = await fetch("/api/nutrition");
                const data = await res.json();
                
                if (data.nutrition) {
                    setNutrition(data.nutrition);
                    setLoading(false);
                } else if (retries < maxRetries) {
                    retries++;
                    setTimeout(fetchNutrition, interval); // Retry
                } else {
                    setLoading(false); // Stop trying after max retries
                }
            } catch (error) {
                console.error("Error fetching nutrition:", error);
                setLoading(false);
            }
        };

        fetchNutrition();
    }, []);

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
                    <Text size="md">Date: {formatDate(new Date())}</Text>
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

                    {/* Progress bars */}
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

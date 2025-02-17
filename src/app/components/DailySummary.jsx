"use client";
import { Card, Text, Grid, Box, Flex, Progress, RingProgress } from "@mantine/core";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks"; 
import formatDate from "../(tools)/formatdate";

const DailySummary = (props) => {
    const [nutrition, setNutrition] = useState({});
    const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Check screen size

    useEffect(() => {
        const fetchNutrition = async () => {
            const res = await fetch("/api/nutrition");
            const data = await res.json();
            setNutrition(data.nutrition);
        };
        fetchNutrition();
    }, []);

    if (!nutrition) return <p>Loading...</p>;

    const proteinPercent = (nutrition.protein / props.user.goalProtein) * 100;
    const carbsPercent = (nutrition.carbs / props.user.goalCarbs) * 100;
    const fatPercent = (nutrition.fat / props.user.goalFat) * 100;

    const proteinCaloriesPercentage = ((nutrition.protein * 4) / props.user.goalCalories) * 100;
    const carbsCaloriesPercentage = ((nutrition.carbs * 4) / props.user.goalCalories) * 100;
    const fatCaloriesPercentage = ((nutrition.fat * 9) / props.user.goalCalories) * 100;
    
    return (
        <Card shadow="xs" padding="md" radius="md">
            <Flex direction="column" gap="xl">
                {/* Header */}
                <Flex justify="space-between" align="center" wrap="wrap">
                    <Text size="xl">Daily Summary</Text>
                    <Text size="md">Date: {formatDate(new Date())}</Text>
                </Flex>

                {/* RingProgress moves ABOVE the progress bars on small screens */}
                {isSmallScreen && (
                    <Flex justify="center">
                        <RingProgress 
                            size={180} // Larger size when above
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

                {/* Layout changes based on screen size */}
                <Flex 
                    direction={isSmallScreen ? "column" : "row"} 
                    align="center" 
                    gap="xl"
                    justify="center"
                >
                    {/* RingProgress stays BESIDE progress bars on large screens */}
                    {!isSmallScreen && (
                        <Flex justify="center">
                            <RingProgress 
                                size={150} // Default size for larger screens
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

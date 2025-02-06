"use client";
import { Card, Text, Grid, Box, Flex, Progress, RingProgress } from "@mantine/core";
import { useEffect, useState } from "react";
import formatDate from "../(tools)/formatdate";

const DailySummary = (props) => {
    const [nutrition, setNutrition] = useState({});
    useEffect(() => {
        const fetchNutrition = async () => {
            const res = await fetch("/api/nutrition");
            const data = await res.json();
            console.log(data);
            setNutrition(data.nutrition);
        };
        fetchNutrition();
    }, []);
    if(!nutrition) return <p>Loading...</p>;


    const proteinPercent = (nutrition.protein / props.user.goalProtein) * 100;
    const carbsPercent = (nutrition.carbs / props.user.goalCarbs) * 100;
    const fatPercent = (nutrition.fat / props.user.goalFat) * 100;

    const proteinCaloriesPercentage = ((nutrition.protein * 4) / props.user.goalCalories) * 100;
    const carbsCaloriesPercentage = ((nutrition.carbs * 4) / props.user.goalCalories) * 100;
    const fatCaloriesPercentage = ((nutrition.fat * 9) / props.user.goalCalories) * 100;
    
    return (
        <Card shadow="xs" padding="md" radius="md">
            <Flex direction="column" gap="xl">
                <Flex justify="space-between">
                    <Text size="xl">Daily Summary</Text>
                    <Text size="xl">Date: {formatDate(new Date())}</Text>
                </Flex>
                <Flex justify="space-between" padding="sm">
                    <Grid>
                        <Grid.Col span={12}>
                            <Box padding="sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text size="lg" style={{ width: '150px' }}>Protein</Text>
                                <Progress color="red" value={proteinPercent} style={{ flex: 1, margin: '0 10px' }} />
                                <Text size="lg">{nutrition.protein}g / {props.user.goalProtein}g</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Box padding="sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text size="lg" style={{ width: '150px' }}>Carbohydrates</Text>
                                <Progress color="orange" value={carbsPercent} style={{ flex: 1, margin: '0 10px' }} />
                                <Text size="lg">{nutrition.carbs}g / {props.user.goalCarbs}g</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Box padding="sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text size="lg" style={{ width: '150px' }}>Fat</Text>
                                <Progress value={fatPercent} style={{ flex: 1, margin: '0 10px' }} />
                                <Text size="lg">{nutrition.fat}g / {props.user.goalFat}g</Text>
                            </Box>
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Box>
                            <Grid.Col span={12}>
                                <Box padding="sm">
                                    <RingProgress 
                                        size={150}
                                        label={<Text fw={700} ta="center" size="md">{nutrition.calories} / {props.user.goalCalories} Calories</Text>} 
                                        sections={[
                                            { value: proteinCaloriesPercentage, color: 'red' },
                                            { value: carbsCaloriesPercentage, color: 'orange' },
                                            { value: fatCaloriesPercentage, color: 'blue' },
                                        ]} 
                                    />
                                </Box>
                            </Grid.Col>
                        </Box>
                    </Grid>
                </Flex>
            </Flex>                                    
        </Card>
    )
}

export default DailySummary;
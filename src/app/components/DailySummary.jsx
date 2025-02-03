"use client";
import { Card, Text, Grid, Box, Flex, Progress, RingProgress } from "@mantine/core";
import { useEffect } from "react";

const DailySummary = (props) => {
    const [macros, setMacros] = useState({});
    const [loading, setLoading] = useState(true);
    const formatDate = (date) => {
        return new Intl.DateTimeFormat("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }).format(new Date(date));
    };
    
    useEffect(() => {
        const fetchNutrition = async () => {
        }  
    })
      

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
                                <Progress color="red" value={50} style={{ flex: 1, margin: '0 10px' }} />
                                <Text size="lg">{20}g / {props.user.goalProtein}g</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Box padding="sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text size="lg" style={{ width: '150px' }}>Carbohydrates</Text>
                                <Progress color="orange" value={20} style={{ flex: 1, margin: '0 10px' }} />
                                <Text size="lg">{20}g / {props.user.goalCarbs}g</Text>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Box padding="sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text size="lg" style={{ width: '150px' }}>Fat</Text>
                                <Progress value={15} style={{ flex: 1, margin: '0 10px' }} />
                                <Text size="lg">{20}g / {props.user.goalFat}g</Text>
                            </Box>
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Box>
                            <Grid.Col span={12}>
                                <Box padding="sm">
                                    <Text size="xl" weight={700}>
                                        <RingProgress 
                                            size={125}
                                            label={<Text ta="center" size="md">{props.user.goalCalories}</Text>} 
                                            sections={[
                                                { value: 40, color: 'red' },
                                                { value: 10, color: 'orange' },
                                                { value: 15, color: 'blue' },
                                            ]} 
                                        />
                                    </Text>
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
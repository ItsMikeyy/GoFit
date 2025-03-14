import {Card, Text, Tabs, Button} from '@mantine/core';
import MealList from './MealList';
import { useState, useEffect } from 'react';
import { useDate } from '@/app/context/DateContext';
const MealPanel = () => { 
    const [meals, setMeals] = useState([])
    const { date } = useDate();
    useEffect(() => {
        fetchMeals()
    }, [date])

    async function fetchMeals () {
        const res = await fetch(`/api/meal?date=${date}`);
        const resData = await res.json();
        setMeals(resData.data);
    } 
    return (
        <Card shadow="xs" padding="md" radius="md" style={{ marginTop: '20px' }}>
            <Text size="xl">Meal List</Text>
            <Tabs variant="pills" defaultValue="breakfast">
                <Tabs.List justify='center'>
                    <Tabs.Tab value="breakfast">Breakfast</Tabs.Tab>
                    <Tabs.Tab value="lunch">Lunch</Tabs.Tab>
                    <Tabs.Tab value="dinner">Dinner</Tabs.Tab>
                    <Tabs.Tab value="snacks">Snacks</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="breakfast">
                    <MealList type="breakfast" meal={meals}/>
                </Tabs.Panel>

                <Tabs.Panel value="lunch">
                    <MealList type="lunch" meal={meals}/>
                </Tabs.Panel>

                <Tabs.Panel value="dinner">
                    <MealList type="dinner" meal={meals}/>
                </Tabs.Panel>

                <Tabs.Panel value="snacks">
                    <MealList type="snacks" meal={meals}/>
                </Tabs.Panel>
            </Tabs>
        </Card>
    );
}
export default MealPanel;

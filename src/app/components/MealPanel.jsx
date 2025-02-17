import {Card, Text, Tabs, Button} from '@mantine/core';
import MealList from './MealList';
import MealModal from './MealModal';
import { useState, useEffect } from 'react';

const MealPanel = () => { 
    const [meals, setMeals] = useState([])
    useEffect(() => {
        const fetchMeals = async() => {
            const res = await fetch("api/meal");
            const resData = await res.json();
            setMeals(resData.data);
        } 
        fetchMeals()
    }, [])
    
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

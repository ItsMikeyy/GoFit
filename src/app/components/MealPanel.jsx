import {Card, Text, Tabs, Button} from '@mantine/core';
import MealList from './MealList';
import MealModal from './MealModal';
const MealPanel = () => { 
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
                    <MealList type="breakfast" />
                </Tabs.Panel>

                <Tabs.Panel value="lunch">
                    <MealList type="lunch" />
                </Tabs.Panel>

                <Tabs.Panel value="dinner">
                    <MealList type="lunch" />
                </Tabs.Panel>

                <Tabs.Panel value="snacks">
                    <MealList type="snacks" />
                </Tabs.Panel>
            </Tabs>
            <MealModal type="breakfast"/>
        </Card>
    );
}
export default MealPanel;

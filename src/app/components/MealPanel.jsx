import {Card, Text, Tabs, Button} from '@mantine/core';
import MealList from './MealList';
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
                    <MealList title="Eggs" />
                </Tabs.Panel>

                <Tabs.Panel value="lunch">
                    Messages tab content
                </Tabs.Panel>

                <Tabs.Panel value="dinner">
                    Settings tab content
                </Tabs.Panel>

                <Tabs.Panel value="snacks">
                    Settings tab content
                </Tabs.Panel>
            </Tabs>
            <Button  size='s' style={{ width: "5%", marginTop: '20px', minWidth: "100px"}}>Add</Button>
        </Card>
    );
}
export default MealPanel;

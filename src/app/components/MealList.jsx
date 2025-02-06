import { Card, Text } from "@mantine/core"
const MealList = (props) => {
    return (
        <div>  
            <Text>Breakfast</Text>
            <Card shadow="xs" padding="md" radius="md" style={{ marginTop: '20px' }}>
                <Text>{props.title}</Text>
            </Card>
        </div>
    );
}

export default MealList;
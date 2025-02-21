"use client"
import { useUser } from "../components/UserContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Card, Text, Group } from "@mantine/core";

const Profile = () => {  
  const { data: session, status, update } = useSession();
  const user = useUser();
  const [dbUser, setDbUser] = useState(session?.user?.dbUser)

  const [fetched, setFetched] = useState(false); 

  useEffect(() => {
      const fetchUser = async () => {
        if (!session.user.dbUser && !fetched) {
          setFetched(true); 
          const updatedSession = await update();   
          setDbUser(updatedSession?.user?.dbUser); 
        
        }
      };
      console.log("Call")
      fetchUser();
    }, [update, fetched]); 

  if (status === "loading") return <p>Loading...</p>;
  if (!dbUser) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

    return (
        <Container size="xs" pt="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text align="center" size="xl" weight={700}>
            Profile
          </Text>
          <Group mt="md">
            <Text size="md">
              <strong>Name:</strong> {dbUser.name}
            </Text>
          </Group>
          <Group>
            <Text size="md">
              <strong>Email:</strong> {dbUser.email}
            </Text>
          </Group>
          <Group>
            <Text size="md">
              <strong>Age:</strong> {dbUser.age}
            </Text>
          </Group>
          <Group>
            <Text size="md">
              <strong>Gender:</strong> {dbUser.gender}
            </Text>
          </Group>
          <Group>
            <Text size="md">
              <strong>Weight:</strong> {dbUser.weight} {user.unit === "Pounds" ? "lbs" : "kg"}
            </Text>
          </Group>
          <Group>
            <Text size="md">
              <strong>Height:</strong> {dbUser.height}cm
            </Text>
          </Group>
        </Card>
      </Container>
    );

}

export default Profile
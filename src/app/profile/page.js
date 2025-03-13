"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Container, Card, Text, Group, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import EditProfileModal from "../components/Profile/EditProfileModal";

const Profile = () => {  
  const { data: session, status, update } = useSession();
  const [dbUser, setDbUser] = useState(session?.user?.dbUser)
  const [profile, setProfile] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [fetched, setFetched] = useState(false); 

  useEffect(() => {
        const fetchUser = async () => {
        const userData = localStorage.getItem("userSession")
        if(!userData && !session.user.dbUser && !fetched) {
            setFetched(true); 
            const updatedSession = await update();   
            console.log(updatedSession)
            localStorage.setItem("userSession", JSON.stringify(updatedSession?.user?.dbUser))
            setDbUser(updatedSession?.user?.dbUser); 
        }
        else {
            const parsedUserData = JSON.parse(userData)
            setDbUser(parsedUserData)
        }
      };
      fetchUser();
    }, [update, fetched]); 

  const handleEdit = () => {
    setProfile(dbUser)
    open()
  }


  if (status === "loading") return <p>Loading...</p>;
  if (!dbUser) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

    return (
      <>
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
                <strong>Weight:</strong> {dbUser.weight} {dbUser.unit === "Pounds" ? "lbs" : "kg"}
              </Text>
            </Group>
            <Group>
              <Text size="md">
                <strong>Height:</strong> {dbUser.height}cm
              </Text>
            </Group>
            <Button onClick={() => handleEdit()} style={{margin: "10px 0"}}>Edit</Button>
          </Card>
        </Container>
        {profile &&
          <Modal opened={opened} onClose={close} title="Edit Profile">
            <EditProfileModal profile={profile} />
          </Modal>}
      </>
    );

}

export default Profile
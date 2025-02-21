"use client"
import { useUser } from "../components/UserContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Card, Text, Group } from "@mantine/core";

const Profile = () => {
  return <h1>Profile</h1>
    // const router = useRouter()
    // const { data: session, status, update } = useSession();
    // const user = useUser();
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push("/");
    //         return
    //     }
        
    //     const updateSession = async() => {
    //         await update();
    //         if (!session.user?.id && !user) {
    //             router.push("/welcome");
    //         }
    //         setLoading(false)
    //     }

    //     updateSession();
    // },[]);

    // if(user?.id) {
    //     return (
    //         <Container size="xs" pt="xl">
    //         <Card shadow="sm" padding="lg" radius="md" withBorder>
    //           <Text align="center" size="xl" weight={700}>
    //             Profile
    //           </Text>
    //           <Group mt="md">
    //             <Text size="md">
    //               <strong>Name:</strong> {user.name}
    //             </Text>
    //           </Group>
    //           <Group>
    //             <Text size="md">
    //               <strong>Email:</strong> {user.email}
    //             </Text>
    //           </Group>
    //           <Group>
    //             <Text size="md">
    //               <strong>Age:</strong> {user.age}
    //             </Text>
    //           </Group>
    //           <Group>
    //             <Text size="md">
    //               <strong>Gender:</strong> {user.gender}
    //             </Text>
    //           </Group>
    //           <Group>
    //             <Text size="md">
    //               <strong>Weight:</strong> {user.weight} {user.unit === "Pounds" ? "lbs" : "kg"}
    //             </Text>
    //           </Group>
    //           <Group>
    //             <Text size="md">
    //               <strong>Height:</strong> {user.height}cm
    //             </Text>
    //           </Group>
    //         </Card>
    //       </Container>
    //     );
    // }

}

export default Profile
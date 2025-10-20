"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Container, Card, Text, Group, Button, Modal, Box, Stack, Title, Loader, SimpleGrid, ThemeIcon, Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUser, IconMail, IconCalendar, IconGenderBigender, IconWeight, IconRuler, IconEdit, IconTrophy, IconTarget, IconChartLine } from "@tabler/icons-react";

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
        if(!userData && !session?.user?.dbUser && !fetched) {
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
    }, [update, fetched, session?.user?.dbUser]); 

  const handleEdit = () => {
    setProfile(dbUser)
    open()
  }

  if (status === "loading") {
    return (
      <Box
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Stack align="center" spacing="xl">
          <Loader size="xl" color="white" />
          <Text size="lg" style={{ color: "white" }}>
            Loading your profile...
          </Text>
        </Stack>
      </Box>
    );
  }

  if (!dbUser) {
    return (
      <Box
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Card
          shadow="xl"
          padding="xl"
          radius="md"
          style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            maxWidth: "500px",
            textAlign: "center"
          }}
        >
          <Stack align="center" spacing="md">
            <Loader size="lg" />
            <Title order={3} style={{ color: "#667eea" }}>
              Loading your data...
            </Title>
            <Text c="dimmed">
              Please refresh if this is taking too long
            </Text>
            <Button
              onClick={() => window.location.reload()}
              style={{
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                border: "none"
              }}
            >
              Refresh Page
            </Button>
          </Stack>
        </Card>
      </Box>
    );
  }

  

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
      }}
    >
      {/* Header Section */}
      <Box
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "3rem 0 2rem 0",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Container size="lg">
          <Stack align="center" spacing="xl" style={{ textAlign: "center" }}>
            <Box
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 25px rgba(255, 215, 0, 0.3)"
              }}
            >
              <IconUser size={60} style={{ color: "white" }} />
            </Box>
            <Title 
              order={1} 
              size="2.5rem" 
              weight={800}
              style={{ 
                color: "white",
                textShadow: "0 4px 20px rgba(0,0,0,0.3)"
              }}
            >
              {dbUser.name}
            </Title>

          </Stack>
        </Container>
      </Box>

      <Container size="md" mt="xl" style={{ paddingBottom: "3rem" }}>
        <Card 
          shadow="xl" 
          padding="xl" 
          radius="md" 
          style={{
            background: "white",
            border: "1px solid #e9ecef"
          }}
        >
          <Stack spacing="xl">
            <Title order={2} size="1.8rem" weight={700} style={{ textAlign: "center", color: "#667eea" }}>
              Profile Information
            </Title>
            
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
              <Box>
                <Group spacing="md" mb="sm">
                  <ThemeIcon size="md" radius="xl" style={{ background: "linear-gradient(45deg, #667eea, #764ba2)" }}>
                    <IconUser size={20} style={{ color: "white" }} />
                  </ThemeIcon>
                  <Text size="md" weight={600} c="dimmed">Name</Text>
                </Group>
                <Text size="lg" weight={500} style={{ marginLeft: "2.5rem" }}>
                  {dbUser.name}
                </Text>
              </Box>

              <Box>
                <Group spacing="md" mb="sm">
                  <ThemeIcon size="md" radius="xl" style={{ background: "linear-gradient(45deg, #ff6b6b, #ee5a24)" }}>
                    <IconMail size={20} style={{ color: "white" }} />
                  </ThemeIcon>
                  <Text size="md" weight={600} c="dimmed">Email</Text>
                </Group>
                <Text size="lg" weight={500} style={{ marginLeft: "2.5rem" }}>
                  {dbUser.email}
                </Text>
              </Box>

              <Box>
                <Group spacing="md" mb="sm">
                  <ThemeIcon size="md" radius="xl" style={{ background: "linear-gradient(45deg, #51cf66, #40c057)" }}>
                    <IconCalendar size={20} style={{ color: "white" }} />
                  </ThemeIcon>
                  <Text size="md" weight={600} c="dimmed">Age</Text>
                </Group>
                <Text size="lg" weight={500} style={{ marginLeft: "2.5rem" }}>
                  {dbUser.age} years old
                </Text>
              </Box>

              <Box>
                <Group spacing="md" mb="sm">
                  <ThemeIcon size="md" radius="xl" style={{ background: "linear-gradient(45deg, #ffd43b, #fab005)" }}>
                    <IconGenderBigender size={20} style={{ color: "white" }} />
                  </ThemeIcon>
                  <Text size="md" weight={600} c="dimmed">Gender</Text>
                </Group>
                <Text size="lg" weight={500} style={{ marginLeft: "2.5rem" }}>
                  {dbUser.gender}
                </Text>
              </Box>

              <Box>
                <Group spacing="md" mb="sm">
                  <ThemeIcon size="md" radius="xl" style={{ background: "linear-gradient(45deg, #74c0fc, #339af0)" }}>
                    <IconWeight size={20} style={{ color: "white" }} />
                  </ThemeIcon>
                  <Text size="md" weight={600} c="dimmed">Weight</Text>
                </Group>
                <Text size="lg" weight={500} style={{ marginLeft: "2.5rem" }}>
                  {dbUser.weight} {dbUser.unit === "Pounds" ? "lbs" : "kg"}
                </Text>
              </Box>

              <Box>
                <Group spacing="md" mb="sm">
                  <ThemeIcon size="md" radius="xl" style={{ background: "linear-gradient(45deg, #9775fa, #845ef7)" }}>
                    <IconRuler size={20} style={{ color: "white" }} />
                  </ThemeIcon>
                  <Text size="md" weight={600} c="dimmed">Height</Text>
                </Group>
                <Text size="lg" weight={500} style={{ marginLeft: "2.5rem" }}>
                  {dbUser.height} cm
                </Text>
              </Box>
            </SimpleGrid>

            <Box style={{ textAlign: "center", marginTop: "2rem" }}>
              <Button 
                onClick={() => handleEdit()} 
                size="lg"
                leftSection={<IconEdit size={20} />}
                style={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  border: "none",
                  borderRadius: "25px",
                  fontWeight: 600,
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                  padding: "0 2rem"
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Stack>
        </Card>
      </Container>

      {profile &&
        <Modal 
          opened={opened} 
          onClose={close} 
          title="Edit Profile"
          size="lg"
          centered
          styles={{
            modal: {
              zIndex: 100,
              background: "white"
            },
            overlay: {
              zIndex: 200,
              backgroundColor: "rgba(0, 0, 0, 0.5)"
            },
            header: {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              borderRadius: "8px 8px 0 0",
              padding: "1rem 1.5rem"
            },
            content: {
              borderRadius: "8px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              background: "white"
            },
            body: {
              padding: "1.5rem",
              background: "white"
            }
          }}
        >
          <EditProfileModal profile={profile} />
        </Modal>
      }
    </Box>
  );
}

export default Profile
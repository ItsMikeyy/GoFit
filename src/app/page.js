"use client";

import { Button, Container, Title, Text, Center, Stack, Group, Box, ThemeIcon, SimpleGrid, Card, Badge, Flex } from "@mantine/core";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { IconBarbell, IconApple, IconChartLine, IconTrophy, IconArrowRight, IconStar } from "@tabler/icons-react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const handleClick = () => {
    if (status === "unauthenticated") {
      signIn()
      return
    }
    router.push("/dashboard");
  }

  const features = [
    {
      icon: IconBarbell,
      title: "Workout Tracking",
      description: "Log your exercises, sets, and reps with detailed progress tracking"
    },
    {
      icon: IconApple,
      title: "Nutrition Management",
      description: "Track your meals, calories, and macronutrients for optimal health"
    },
    {
      icon: IconChartLine,
      title: "Progress Analytics",
      description: "Visualize your fitness journey with comprehensive charts and insights"
    },

  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Background Pattern */}
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>')",
            opacity: 0.3
          }}
        />
        
        <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
          <Center style={{ minHeight: "100vh", padding: "2rem 0" }}>
            <Stack align="center" spacing="xl" style={{ textAlign: "center" }}>
              <Box>
                <Title 
                  order={1} 
                  size="4rem"
                  weight={800}
                  style={{ 
                    color: "white",
                    textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    marginBottom: "1rem"
                  }}
                >
                  Welcome to{" "}
                  <span style={{ 
                    background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    GoFit
                  </span>
                </Title>
                
                <Text 
                  size="xl" 
                  style={{ 
                    color: "rgba(255,255,255,0.9)",
                    maxWidth: "600px",
                    lineHeight: 1.6,
                    marginBottom: "2rem"
                  }}
                >
                  Start your fitness journey with our tracking platform. 
                  Monitor workouts, manage nutrition, and achieve your goals.
                </Text>
              </Box>

              <Group spacing="md">
                <Button 
                  size="xl" 
                  onClick={handleClick}
                  rightIcon={<IconArrowRight size={20} />}
                  style={{
                    background: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
                    border: "none",
                    borderRadius: "50px",
                    padding: "0 2rem",
                    height: "60px",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    boxShadow: "0 8px 25px rgba(255, 107, 107, 0.4)"
                  }}
                >
                  Get Started
                </Button>
              </Group>

              {/* Trust Indicators */}
              <Group spacing="lg" style={{ marginTop: "3rem" }}>
                <Group spacing="xs">
                  <IconStar size={20} style={{ color: "#ffd700" }} />
                  <Text size="sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                    4.9/5 Rating
                  </Text>
                </Group>
                <Text size="sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                  •
                </Text>
                <Text size="sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                  10,000+ Active Users
                </Text>
                <Text size="sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                  •
                </Text>
                <Text size="sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Free Forever
                </Text>
              </Group>
            </Stack>
          </Center>
        </Container>
      </Box>

      <Box style={{ padding: "5rem 0", background: "#f8f9fa" }}>
        <Container size="lg">
          <Stack align="center" justify="center" items="center" spacing="xl">
            <Box style={{ textAlign: "center" }}>
              <Title order={2} size="2.5rem" weight={700} style={{ marginBottom: "1rem" }}>
                Everything You Need to Succeed
              </Title>
              <Text size="lg" c="dimmed" style={{ maxWidth: "600px" }}>
                Our platform helps you track your workouts, meals, and progress with ease.
              </Text>
            </Box>

            <Flex justify="center" wrap="wrap" gap="xl" style={{ width: "100%" }}>
              {features.map((feature, index) => (
                <Card
                  key={index}
                  shadow="sm"
                  padding="xl"
                  radius="md"
                  style={{
                    background: "white",
                    border: "1px solid #e9ecef",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    flex: "1 1 300px",
                    maxWidth: "350px",
                    minWidth: "280px"
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                    }}
                  >
                    <Stack align="center" spacing="md" style={{ textAlign: "center" }}>
                      <ThemeIcon
                        size={60}
                        radius="xl"
                        style={{
                          background: "linear-gradient(45deg, #667eea, #764ba2)",
                          color: "white"
                        }}
                      >
                        <feature.icon size={30} />
                      </ThemeIcon>
                      <Title order={4} size="1.2rem" weight={600}>
                        {feature.title}
                      </Title>
                      <Text size="sm" c="dimmed" style={{ lineHeight: 1.5 }}>
                        {feature.description}
                      </Text>
                    </Stack>
                  </Card>
                ))}
            </Flex>
          </Stack>
        </Container>
      </Box>

      <Box style={{ padding: "5rem 0", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <Container size="md">
          <Center>
            <Stack align="center" spacing="xl" style={{ textAlign: "center" }}>
              <Title order={2} size="2.5rem" weight={700} style={{ color: "white" }}>
                Ready to Transform Your Fitness?
              </Title>
              <Text size="lg" style={{ color: "rgba(255,255,255,0.9)", maxWidth: "500px" }}>
                Join thousands of users who are already achieving their fitness goals with GoFit.
              </Text>
              <Button 
                size="xl" 
                onClick={handleClick}
                rightIcon={<IconArrowRight size={20} />}
                style={{
                  background: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
                  border: "none",
                  borderRadius: "50px",
                  padding: "0 2rem",
                  height: "60px",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  boxShadow: "0 8px 25px rgba(255, 107, 107, 0.4)"
                }}
              >
                Get Started
              </Button>
            </Stack>
          </Center>
        </Container>
      </Box>
    </Box>
  );
}

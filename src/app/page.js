"use client";

import { Button, Container, Title, Text, Center, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
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

  return (
    <Container size="md" style={{ height: "100vh" }}>
      <Center style={{ height: "100%" }}>
        <Stack align="center" spacing="xl">
          <Title order={1} align="center">
            Welcome to <span style={{ color: "#228be6" }}>GoFit</span>
          </Title>
          <Text align="center" size="lg" color="dimmed">
            Track your workouts, meals, and progress all in one place.
          </Text>
          <Button size="lg" onClick={handleClick}>
            Get Started
          </Button>
        </Stack>
      </Center>
    </Container>
  );
}

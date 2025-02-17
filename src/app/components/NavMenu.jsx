"use client";

import { useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Box, Container, Group, Burger, Drawer, Button, Text 
} from "@mantine/core";

export default function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  return (
    <Box p="md"
      style={{
        display: "flex",
        borderBottom: "1px solid #ddd",
        justifyContent: "space-between"
      }}
    >
    <Text size="xl" weight={700}  style={{ cursor: "pointer", color: "#228be6", fontWeight: "bold" }} onClick={() => router.push("/")}>
        GoFit
    </Text>
      <Container size="md" style={{
        display: "flex",
        justifyContent: "flex-end", 
        width: "100%",
        margin: "0"
      }}>
        <Group gap="xl" visibleFrom="sm">
          <Button variant="subtle" onClick={() => router.push("/")}>Home</Button>
          {session && <Button variant="subtle" onClick={() => router.push("/dashboard")}>Dashboard</Button>}
          {session ? (
            <>
              <Button variant="subtle" onClick={() => router.push("/profile")}>Profile</Button>
              <Button color="red" onClick={() => signOut()}>Sign Out</Button>
            </>
          ) : <Button variant="subtle" onClick={() => signIn()}>Sign In</Button>}
        </Group>

        <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom="sm" />

        <Drawer opened={opened} onClose={() => setOpened(false)} padding="md" title="Menu">
          <Button fullWidth variant="subtle" onClick={() => router.push("/")}>Home</Button>
          <Button fullWidth variant="subtle" onClick={() => router.push("/dashboard")}>Dashboard</Button>
          {session && (
            <>
              <Button fullWidth variant="subtle" onClick={() => router.push("/profile")}>Profile</Button>
              <Button fullWidth color="red" onClick={() => signOut()}>Sign Out</Button>
            </>
          )}
        </Drawer>
      </Container>
    </Box>
  );
}

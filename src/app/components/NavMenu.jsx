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
  const [open, setOpen] = useState(false);
  
  const handleNavigation = (path) => {
    setOpen(false); 
    setTimeout(() => router.push(path), 300); 
  };

  return (
    <Box p="md"
      style={{
        display: "flex",
        borderBottom: "1px solid #ddd",
        justifyContent: "space-between"
      }}
    >
      <Text 
        size="xl" 
        weight={700}  
        style={{ cursor: "pointer", color: "#228be6", fontWeight: "bold" }} 
        onClick={() => router.push("/")}
      >
        GoFit
      </Text>

      <Container 
        size="md" 
        style={{
          display: "flex",
          justifyContent: "flex-end", 
          width: "100%",
          margin: "0"
        }}
      >
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

        <Burger style={{ paddingRight: '20px' }} opened={open} onClick={() => setOpen(!open)} hiddenFrom="sm" />

        <Drawer 
        opened={open} 
        onClose={() => setOpen(false)} 
        padding="md" 
        title="Menu"
        styles={{
          header: {
            paddingRight: "20px"
          },
        }}
      >
          <Button fullWidth variant="subtle" onClick={() => handleNavigation("/")}>Home</Button>
          {session && (
            <>
              <Button fullWidth variant="subtle" onClick={() => handleNavigation("/dashboard")}>Dashboard</Button>
              <Button fullWidth variant="subtle" onClick={() => handleNavigation("/profile")}>Profile</Button>
              <Button fullWidth color="red" onClick={() => { setOpen(false); signOut(); }}>Sign Out</Button>
            </>
          )}
          {!session && <Button fullWidth variant="subtle" onClick={() => handleNavigation("/signin")}>Sign In</Button>}
        </Drawer>
      </Container>
    </Box>
  );
}

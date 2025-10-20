"use client";

import { useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Box, Container, Group, Burger, Drawer, Button, Text, Stack
} from "@mantine/core";
import { IconUser, IconDashboard, IconHome, IconLogout, IconLogin } from "@tabler/icons-react";

export default function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  
  const handleNavigation = (path) => {
    setOpen(false); 
    setTimeout(() => router.push(path), 300); 
  };
  const handleSignOut = () => {
    localStorage.removeItem("userSession"); 
    setOpen(false); 
    signOut();
  }
  
  return (
    <Box
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >
      <Container size="lg" p="md">
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {/* Logo */}
          <Text 
            size="xl" 
            weight={800}  
            style={{ 
              cursor: "pointer", 
              background: "linear-gradient(45deg, #ffd700, #ffed4e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "1.8rem",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)"
            }} 
            onClick={() => router.push("/")}
          >
            GoFit
          </Text>

          {/* Desktop Navigation */}
          <Group gap="md" visibleFrom="sm">
            <Button 
              variant="subtle" 
              onClick={() => router.push("/")}
              leftSection={<IconHome size={16} />}
              style={{
                color: "white",
                fontWeight: 500,
                "&:hover": {
                  background: "rgba(255,255,255,0.1)",
                  transform: "translateY(-1px)"
                }
              }}
            >
              Home
            </Button>
            
            {session && (
              <Button 
                variant="subtle" 
                onClick={() => router.push("/dashboard")}
                leftSection={<IconDashboard size={16} />}
                style={{
                  color: "white",
                  fontWeight: 500,
                  "&:hover": {
                    background: "rgba(255,255,255,0.1)",
                    transform: "translateY(-1px)"
                  }
                }}
              >
                Dashboard
              </Button>
            )}
            
            {session ? (
              <>
                <Button 
                  variant="subtle" 
                  onClick={() => router.push("/profile")}
                  leftSection={<IconUser size={16} />}
                  style={{
                    color: "white",
                    fontWeight: 500,
                    "&:hover": {
                      background: "rgba(255,255,255,0.1)",
                      transform: "translateY(-1px)"
                    }
                  }}
                >
                  Profile
                </Button>
                <Button 
                  color="red" 
                  onClick={handleSignOut}
                  leftSection={<IconLogout size={16} />}
                  style={{
                    background: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
                    border: "none",
                    borderRadius: "25px",
                    fontWeight: 600,
                    boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(255, 107, 107, 0.4)"
                    }
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                variant="outline"
                onClick={() => signIn()}
                leftSection={<IconLogin size={16} />}
                style={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.5)",
                  borderRadius: "25px",
                  fontWeight: 600,
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.2)",
                    transform: "translateY(-1px)"
                  }
                }}
              >
                Sign In
              </Button>
            )}
          </Group>

          {/* Mobile Menu Button */}
          <Burger 
            opened={open} 
            onClick={() => setOpen(!open)} 
            hiddenFrom="sm"
            color="white"
            size="md"
          />

          {/* Mobile Drawer */}
          <Drawer 
            opened={open} 
            onClose={() => setOpen(false)} 
            padding="xl" 
            title={
              <Text 
                size="xl" 
                weight={800}
                style={{ 
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                GoFit Menu
              </Text>
            }
            styles={{
              header: {
                borderBottom: "1px solid #e9ecef",
                paddingBottom: "1rem"
              },
              content: {
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
              }
            }}
          >
            <Stack gap="md">
              <Button 
                fullWidth 
                variant="subtle" 
                onClick={() => handleNavigation("/")}
                leftSection={<IconHome size={18} />}
                style={{
                  justifyContent: "flex-start",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  fontWeight: 500
                }}
              >
                Home
              </Button>
              
              {session && (
                <>
                  <Button 
                    fullWidth 
                    variant="subtle" 
                    onClick={() => handleNavigation("/dashboard")}
                    leftSection={<IconDashboard size={18} />}
                    style={{
                      justifyContent: "flex-start",
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      fontWeight: 500
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    fullWidth 
                    variant="subtle" 
                    onClick={() => handleNavigation("/profile")}
                    leftSection={<IconUser size={18} />}
                    style={{
                      justifyContent: "flex-start",
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      fontWeight: 500
                    }}
                  >
                    Profile
                  </Button>
                  <Button 
                    fullWidth 
                    color="red" 
                    onClick={handleSignOut}
                    leftSection={<IconLogout size={18} />}
                    style={{
                      background: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
                      border: "none",
                      borderRadius: "12px",
                      fontWeight: 600,
                      justifyContent: "flex-start",
                      padding: "0.75rem 1rem",
                      boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)"
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              )}
              
              {!session && (
                <Button 
                  fullWidth 
                  variant="outline"
                  onClick={() => handleNavigation("/signin")}
                  leftSection={<IconLogin size={18} />}
                  style={{
                    justifyContent: "flex-start",
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    fontWeight: 600,
                    borderColor: "#667eea",
                    color: "#667eea"
                  }}
                >
                  Sign In
                </Button>
              )}
            </Stack>
          </Drawer>
        </Box>
      </Container>
    </Box>
  );
}

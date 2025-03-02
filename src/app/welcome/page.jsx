"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useUser } from "../components/UserContext";
import {
  TextInput,
  NumberInput,
  Select,
  Button,
  Stack,
  Card,
  Title,
  Container,
  Group,
} from "@mantine/core";
const Welcome = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const user = useUser();


  useEffect(() => {
    if (!session) {
      router.push("/");
      return
    }      
    update()


    if (user?.id) {
      console.log("here")
        router.push("/dashboard");
    }
    
    
  }, []);



  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    unit: "Pounds", 
    height: "",
    gender: "",
    activity: "",
    goal: "",
  });

  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    
    if (res.ok) {
      await update({ onboardingCompleted: 1 });
      router.push("/dashboard");
      setError("");
  } else {
      const data = await res.json()
      setError(data.message);
      setClicked(false);
  }
    

  };

  return (
    <Container size="sm">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={2} align="center" mb="lg">
          Welcome to GoFit
        </Title>

        <form onSubmit={handleSubmit}>
          <Stack spacing="md">
            <TextInput
              label="Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />

            <NumberInput
              label="Age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={(value) => handleChange("age", value)}
              required
              min={1} 
            />

            <Group grow>
              <NumberInput
                label="Weight"
                placeholder="Enter your weight"
                value={formData.weight}
                onChange={(value) => handleChange("weight", value)}
                required
                min={1}
              />
              <Select
                label="Unit"
                data={[
                  { value: "Pounds", label: "Pounds (lbs)" },
                  { value: "Kilograms", label: "Kilograms (kg)" },
                ]}
                value={formData.unit || "Kilograms"}
                onChange={(value) => handleChange("unit", value)}
                required
              />
            </Group>

            <NumberInput
              label="Height (cm)"
              placeholder="Enter your height"
              value={formData.height}
              onChange={(value) => handleChange("height", value)}
              required
              min={1}
            />

            <Select
              label="Gender"
              placeholder="Select your gender"
              data={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              value={formData.gender}
              onChange={(value) => handleChange("gender", value)}
              required
            />

            <Select
              label="Activity Level"
              placeholder="Select your activity level"
              data={[
                { value: "1.2", label: "Sedentary" },
                { value: "1.375", label: "Lightly active" },
                { value: "1.55", label: "Moderately active" },
                { value: "1.725", label: "Active" },
                { value: "1.9", label: "Very active" },
              ]}
              value={formData.activity}
              onChange={(value) => handleChange("activity", value)}
              required
            />

            <Select
              label="Goal"
              placeholder="Select your fitness goal"
              data={[
                { value: "500", label: "Fast weight gain (1 lb/week)" },
                { value: "250", label: "Moderate weight gain (0.5 lb/week)" },
                { value: "0", label: "Maintain weight" },
                { value: "-250", label: "Moderate weight loss (0.5 lb/week)" },
                { value: "-500", label: "Fast weight loss (1 lb/week)" },
              ]}
              value={formData.goal}
              onChange={(value) => handleChange("goal", value)}
              required
            />

          {!clicked ? <Button type="submit" fullWidth mt="md">Create Account!</Button> : <Button disabled type="submit" fullWidth mt="md">Create Account!</Button>}
          {error && <h1 className="p-4 text-red-700 text-center">Error</h1>}
          </Stack>
        </form>
      </Card>
    </Container>
  );
};

export default Welcome;

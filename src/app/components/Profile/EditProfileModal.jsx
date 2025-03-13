import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  TextInput,
  NumberInput,
  Select,
  Button,
  Stack,
  Card,
  Title,
  Text,
  Container,
  Group,

} from "@mantine/core";

const EditProfileModal = ({profile}) => {
  
    const [formData, setFormData] = useState({
        name: profile.name,
        age: profile.age,
        weight: profile.weight,
        unit: profile.unit, 
        height: profile.height,
        gender: profile.gender,
        activity: profile.activity,
        goal: profile.goal,
    });

    const { data: session, status, update } = useSession();
    const [error, setError] = useState("");
    const [clicked, setClicked] = useState(false);


    const handleChange = (field, value) => {
        setFormData((prevState) => ({
          ...prevState,
          [field]: value,
        }));
      };

   

    const [action, setAction] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()
        setClicked(true);
        if (action === "edit") {
            console.log("Edit", formData)
            const res = await fetch("/api/user/edit", {method: "PATCH",
                body: JSON.stringify(formData)
            })
            const updateData = await res.json()
            if (res.ok) {
                console.log("UPDATE", updateData)
                localStorage.setItem("userSession", JSON.stringify(updateData.user))
                window.location.reload()
                setError("");
            }
            else {
                setError(data.message)
                setClicked(false)
            }
        }
        else if (action === "delete") {
            console.log("Delete", formData)
            const res = await fetch("/api/user/delete", {method: "DELETE",
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                signOut();
            }
        }
    }

    return (
        <Container size="sm">
            <form onSubmit={handleSubmit}>
              <Stack spacing="md">
                <TextInput
                  label="Name"
                  placeholder={formData.name}
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
                <NumberInput
                  label="Age"
                  placeholder={formData.age}
                  value={formData.age}
                  onChange={(value) => handleChange("age", value)}
                  required
                  min={1} 
                />
    
                <Group grow>
                  <NumberInput
                    label="Weight"
                    placeholder={formData.weight}
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
                  placeholder={formData.height}
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
                />
    
                {!clicked ? <Button type="submit" onClick={() => setAction("edit")}fullWidth mt="md">Edit Profile</Button> : <Button disabled name="action" value="edit"  type="submit" fullWidth mt="md">Edit Workout</Button>}
                {!clicked ? <Button fullWidth type="submit" color="red" onClick={() => setAction("delete")} mt="md">Delete Profile</Button> : <Button disabled name="action" value="delete" color="red"  type="submit" fullWidth mt="md">Delete Workout</Button>}
                {error && <h1 className="p-4 text-red-700 text-center">Error</h1>}
              </Stack>
            </form>
        </Container>
      );
}

export default EditProfileModal
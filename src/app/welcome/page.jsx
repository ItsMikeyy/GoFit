"use client";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const WelcomePage = () => {
    const { data: session, status } = useSession();
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        weight: '',
        height: '',
        gender: '',
        activity: '',
        goal: '',
    });

    if (!session) {
        router.push("/");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/user", {method: "POST", body: JSON.stringify(formData)});
    };

    return (
        <div>
            <h1>Welcome to Fitness Tracker</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        className='border border-gray-400'
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        className='border border-gray-400'
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="weight">Weight:</label>
                    <input
                        className='border border-gray-400'
                        type="number"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="height">Height:</label>
                    <input
                        className='border border-gray-400'
                        type="number"
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select
                        className='border border-gray-400'
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="activity">Activity Level:</label>
                    <select
                        className='border border-gray-400'
                        id="activity"
                        name="activity"
                        value={formData.activity}
                        onChange={handleChange}
                    >
                        <option value="">Select Activity Level</option>
                        <option value="1.2">Sedentary</option>
                        <option value="1.375">Lightly active</option>
                        <option value="1.55">Moderately active</option>
                        <option value="1.725">Active</option>
                        <option value="1.9">Very active</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="goal">Goal:</label>
                    <select
                        className='border border-gray-400'
                        id="goal"
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                    >
                        <option value="null">Select Goal</option>
                        <option value="1100">Fast weight gain (1kg/week) </option>
                        <option value="550">Moderate weight gain (0.5kg/week) </option>
                        <option value="0">Maintain weight</option>
                        <option value="-550">Moderate weight loss (0.5kg/week)</option>
                        <option value="-1100">Fast weight loss (1kg/week)</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default WelcomePage;
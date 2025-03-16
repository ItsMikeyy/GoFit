"use client";
import { useSession } from "next-auth/react";
import { Title, Button, Container } from "@mantine/core";import { useEffect, useState } from "react";
import DailySummary from "@/app/components/DailySummary";
import MealPanel from "../components/meals/MealPanel";
import Workout from "../components/workouts/Workout";
export default function Dashboard() {
    const { data: session, status, update } = useSession();
    const [dbUser, setDbUser] = useState(session?.user?.dbUser)

  	const [fetched, setFetched] = useState(false); 
	useEffect(() => {
		const fetchUser = async () => {
			const userData = localStorage.getItem("userSession")
			if(!userData && !session.user.dbUser && !fetched) {
				console.log("Fetch")
				setFetched(true); 
				const updatedSession = await update();   
				console.log(updatedSession)
				localStorage.setItem("userSession", JSON.stringify(updatedSession?.user?.dbUser))
				setDbUser(updatedSession?.user?.dbUser); 
			}
			else {
				console.log("Grab")
				const parsedUserData = JSON.parse(userData)
				setDbUser(parsedUserData)
			}

			// if (!session.user.dbUser && !fetched) {
			
			
			// }
		};
		fetchUser();
		}, [update, fetched]);

		if (status === "loading") return <p>Loading...</p>;
		if (!dbUser) {
		return (
			<div>
			<h1>Loading... please refresh if this is taking to long </h1>
			</div>
		);
		}

		return (
			<div>
				<DailySummary user={dbUser} />
				<MealPanel />
				<Workout />
			</div>
		);c
    
    
}

import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";


export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({error: "Unauthorized", found: false}, { status: 401 });
    }
    try {
        const user = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1);
        if (user.length > 0) {
            return NextResponse.json({user: user[0], found: true}, { status: 200 });
        }
        return NextResponse.json({user: null, found: false, message: "User not found"}, {status: 500});
    } catch(e) {
        return NextResponse.json({user: null, found: false, message: "Error fetching user"}, {status: 500});
    }
    
    
}

export async function POST(req) {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized", found: false }, { status: 401 });
    }

    try {
        const data = await req.json();
        let weight = data.weight;
        if (data.unit === "Pounds") {
            weight = convertToKg(data.weight)
        }
    
        const userData = calculateMacros(data, weight, session)

        const result = await db.insert(users).values({
            ...userData,
            onboardingCompleted: 1,
            email: session.user.email,
        }).execute();
        if (result) {
            return NextResponse.json({ message: "User created successfully", success: true });
        } else {
            return NextResponse.json({ message: "User creation failed", success: false }, { status: 500 });
        }

    } catch (error) {  
        console.error("Error inserting user:", error);
        return NextResponse.json(
            { message: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
}

const convertToKg = (weight) => {
    return (weight * 0.453592).toFixed(2);
}



const calculateMacros = (data, weight, session) => {
    let bmr = 0;
    if (data.gender === "male") {
        bmr = (10 * weight + 6.25 * data.height - 5 * data.age + 5) * data.activity;
    } else {
        bmr = (10 * weight + 6.25 * data.height - 5 * data.age - 161) * data.activity;
    }

    const goalCalories = Math.floor(bmr + Number(data.goal));

    const proteinGrams = Math.floor(2 * weight);
    const proteinCalories = proteinGrams * 4;


    const carbCalories = goalCalories * 0.4;
    const fatCalories = goalCalories - (proteinCalories + carbCalories);
    const carbGrams = Math.floor(carbCalories / 4);
    const fatGrams = Math.floor(fatCalories / 9);
    const user_data = {
        ...data,
        email: session.user.email,
        goalCalories: goalCalories,
        goalProtein: proteinGrams,
        goalFat: fatGrams,
        goalCarbs: carbGrams,
    }
    return user_data;
}
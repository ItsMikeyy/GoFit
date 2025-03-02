import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({error: "Unauthorized", found: false}, { status: 401 });
    }
    try {

        const data = await req.json()
        const uid = session.user.dbUser.id;
        let weight = data.weight;
        if (data.unit === "Pounds") {
            weight = convertToKg(data.weight)
        }
    
        const userData = calculateMacros(data, weight, session)
        console.log(userData)
        const res = db.update(users).set({
            ...userData
        }).where(eq(users.id, uid))
        .execute()
        
        if(!res) {
            return NextResponse.json({message: "Error fetching user"}, {status: 500});
        }
        return NextResponse.json({message: "User updated"}, {status: 200});
       
    } catch(e) {
        console.log(e)
        return NextResponse.json({user: null, found: false, message: "Error fetching user"}, {status: 500});
    }
}

const convertToKg = (weight) => {
    return (weight * 0.453592).toFixed(2);
}

const calculateMacros = (data, weight, session) => {
    console.log(data)

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
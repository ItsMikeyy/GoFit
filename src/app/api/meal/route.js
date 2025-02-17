import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
import { meals, nutritionLogs } from "@/db/schema"; 
import { sql, eq, and } from "drizzle-orm";
import formatDate from "@/app/(tools)/formatdate";

export const GET = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized", found: false }, { status: 401 });
    }
    
    const result = await db.select().from(meals).where(and(
        eq(meals.userId, session.user.id),
        eq(meals.date, formatDate(new Date()))
    ))
    return NextResponse.json({ data: result});

    
}

export const POST = async (req) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized", found: false }, { status: 401 });
    }

    try {
        const data = await req.json();
        console.log(data)
        console.log(session)
        const insertData = {
            userId: session.user.id,
            name: data.name,
            type: data.type,
            amount: data.amount,
            servingSize: data.servingSize,
            calories: data.calories,
            protein: data.protein,
            carbs: data.carbs,
            fat: data.fat,
            date: data.date
        };
        let result = await db.insert(meals).values(insertData).execute();
        if (!result) {
            return NextResponse.json({ message: "Failed to add meal", success: false }, { status: 500 });
        }

        result = await db
            .update(nutritionLogs)
            .set({
            calories: sql`${nutritionLogs.calories} + ${insertData.calories}`,
            protein: sql`${nutritionLogs.protein} + ${insertData.protein}`,
            carbs: sql`${nutritionLogs.carbs} + ${insertData.carbs}`,
            fat: sql`${nutritionLogs.fat} + ${insertData.fat}`,
            })
            .where(
            and(
                eq(nutritionLogs.userId, session.user.id),
                eq(nutritionLogs.date, data.date)
            )
            )
            .execute();
        if(!result) {
            return NextResponse.json({ message: "Failed to update", success: false }, { status: 500 }); 
        }
        return NextResponse.json({ message: "Meal added successfully and nutrition log updated", success: true });
    } catch (error) {
        console.error("Error adding meal:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
};
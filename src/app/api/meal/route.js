import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
import { meals, nutritionLogs } from "@/db/schema"; 
import { sql, eq, and } from "drizzle-orm";
import formatDate from "@/app/(tools)/formatdate";

export const GET = async (req) => {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        return NextResponse.json({ error: "Unauthorized", found: false }, { status: 401 });
    }
    try {
        const {searchParams} = new URL(req.url);
        const date = searchParams.get("date") ?? formatDate(new Date());
        const result = await db.select().from(meals).where(and(
            eq(meals.userId, session.user.dbUser.id),
            eq(meals.date, date)
        ))
        if (!result) {
            return NextResponse.json({ error: "Error fetching exercise", found: false }, { status: 500 });
        }
        return NextResponse.json({ data: result});
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: "Error fetching exercise", found: false }, { status: 500 });
    }
}

export const POST = async (req) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized", found: false }, { status: 401 });
    }

    try {
        const data = await req.json();
        console.log("HERE")

        const nid = await db.select().from(nutritionLogs).where(and(eq(nutritionLogs.date, data.date),eq(nutritionLogs.userId, session.user.dbUser.id)));
        
        if(!nid) {
            return NextResponse.json({ message: "Failed to add meal", success: false }, { status: 500 });
        } 
        const insertData = {
            userId: session.user.dbUser.id,
            nutritionId: nid[0].id,
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

        if(!result) {
            return NextResponse.json({ message: "Failed to update", success: false }, { status: 500 }); 
        }
        return NextResponse.json({ message: "Meal added successfully and nutrition log updated", success: true });
    } catch (error) {
        console.error("Error adding meal:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
};

export const PATCH = async (req) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized", found: false }, { status: 401 });
    }
    try {
        const {id, nutritionId, name, amount, servingSize, protein, carbs, fat, calories} = await req.json();
        let nutritionLog = await db.select().from(nutritionLogs).where(eq(nutritionLogs.id, nutritionId));
        nutritionLog = nutritionLog[0];

        const result = await db.update(meals)
        .set({ name, servingSize, amount, protein , carbs, fat, calories })
        .where(eq(meals.id, id))
        .returning()
        console.log(result)
        if (!result.length) {
            return NextResponse.json({ error: "Meal not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Meal updated successfully", meal: result[0] });
    } catch(e) {
        console.error(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
    
}

export const DELETE = async (req) => {
    const data = await req.json()
    const result = await db.delete(meals).where(eq(meals.id, data.id));
    if (result) {
        return NextResponse.json({ message: "Meal Deleted successfully", meal: result[0] });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
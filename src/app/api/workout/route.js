import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
import { workouts } from "@/db/schema";
import { eq, and } from "drizzle-orm";
export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized"}, { status: 401 });
    }
    try {
        const {searchParams} = new URL(req.url);
        const date = searchParams.get("date") 

        const userWorkouts = await db.select().from(workouts).where(and(eq(session.user.dbUser.id, workouts.userId), eq(date, workouts.date))).limit(1);
        if (userWorkouts.length > 0) {
            return NextResponse.json({ workout: userWorkouts[0] });
        }
        const result = await db.insert(workouts).values({userId: session.user.dbUser.id, date: date}).returning();
        console.log(result);
        if (result) {
            return NextResponse.json({ message: "Workout created successfully", workout: result[0], success: true });
        } else {
            return NextResponse.json({ message: "Workout creation failed", success: false }, { status: 500 });
        }
    } catch(e) {
        console.log(e)
        return NextResponse.json({ message: "Workout creation failed", success: false }, { status: 500 });
    }
    
}
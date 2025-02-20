import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
import { workouts } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import formatDate from "@/app/(tools)/formatdate";
export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized"}, { status: 401 });
    }
    try {
        const {searchParams} = new URL(req.url);
        const date = searchParams.get("date") ?? formatDate(new Date());

        const userWorkouts = await db.select().from(workouts).where(and(eq(session.user.id, workouts.userId), eq(date, workouts.date))).limit(1);
        if (userWorkouts.length > 0) {
            return NextResponse.json({ workout: userWorkouts[0] });
        }
        const result = await db.insert(workouts).values({userId: session.user.id, date: date}).execute();
        console.log(result);
        if (result) {
            return NextResponse.json({ message: "Workout created successfully", workouts: userWorkouts[0], success: true });
        } else {
            return NextResponse.json({ message: "Workout creation failed", success: false }, { status: 500 });
        }
    } catch(e) {
        console.log(e)
        return NextResponse.json({ message: "Workout creation failed", success: false }, { status: 500 });
    }
    
}
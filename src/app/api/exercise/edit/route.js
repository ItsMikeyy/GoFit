import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/db";
import { exercises, exerciseSets } from "@/db/schema";
import { eq } from "drizzle-orm";
export const PATCH = async (req) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { exerciseName, weight, unit, reps, sets, exerciseId, setId } = data;

    try {
        await db.transaction(async (tx) => {
            const res1 = await tx.update(exercises)
                .set({
                    name: exerciseName,
                    unit: unit,
                    sets: sets
                })
                .where(eq(exercises.id, exerciseId))
                .returning();

            if (res1.length === 0) {
                throw new Error("Exercise update failed");
            }

            const res2 = await tx.update(exerciseSets)
                .set({
                    reps: reps,
                    weight: weight,
                    sets: sets
                })
                .where(eq(exerciseSets.id, setId))
                .returning();

            if (res2.length === 0) {
                throw new Error("Exercise set update failed");
            }
        });

        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
};


export const DELETE = async (req) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { exerciseId, setId } = data;
    try {
        await db.transaction(async (tx) => {
            const res1 = await tx.delete(exercises)
                .where(eq(exercises.id, exerciseId))
                .returning();
    
            if (res1.length === 0) {
                throw new Error("Exercise delete failed");
            }
        });
    
        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (e) {
        console.log(e) 
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
    
}
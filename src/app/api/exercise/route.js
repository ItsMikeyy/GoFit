import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
import { exercises, exerciseSets, users, workouts } from "@/db/schema";
import { getServerSession } from "next-auth";
import { eq, and } from "drizzle-orm";
import formatDate from "../../(tools)/formatdate";


export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized", found: false }, { status: 401 });
    }
    const date = formatDate(new Date());
    const data = await req.json();

    const wid = await getWorkoutID(session, date);
    if (!wid) {
        return NextResponse.json({ message: "Exercise creation failed", success: false }, { status: 500 });
    }
    console.log(wid);
    if (data.type == "simple") {
        const res = await handleSimpleExercise(data, date, wid)
        if (!res) {
            return NextResponse.json({ message: "Exercise creation failed", success: false }, { status: 500 });
        }
    }
    else if (data.type == "advanced") {
        const res = await handleAdvancedExercise(data, date, wid)
        if (!res) {
            return NextResponse.json({ message: "Exercise creation failed", success: false }, { status: 500 });
        }
    }

    return NextResponse.json({ message: "Exercise created successfully", success: true });

}

const handleSimpleExercise = async (data, date, wid) => {
    const exerciseResult = await db.insert(exercises).values({
        workoutId: wid,
        name: data.exerciseName,
        unit: data.unit,
        sets: data.sets
    }).returning({id: exercises.id})

    if (!exerciseResult) {
        return false;
    }
    console.log(exerciseResult[0].id)
    const exerciseSetsResult = await db.insert(exerciseSets).values({
        exerciseId: exerciseResult[0].id,
        reps: data.reps,
        weight: data.weight,
        setOrder: 0,
    })
    console.log(exerciseSetsResult)

    if (!exerciseSetsResult) {
        return false;
    }

    return true;
    
}

const handleAdvancedExercise = async (data, date, wid) => {
    const exerciseResult = await db.insert(exercises).values({
        workoutId: wid,
        name: data.exerciseName,
        unit: data.unit,
        sets: data.sets.length
    }).returning({id: exercises.id})

    if (!exerciseResult) {
        return false;
    }

    let setInserts = []
    const eid = exerciseResult[0].id
    for (let i = 0; i < data.sets.length; i++) {
        const setData = data.sets[i] 
        setInserts.push({setOrder: i + 1,exerciseId: eid, reps: setData.reps, weight: setData.weight})
    }
    console.log(setInserts)
    const exerciseSetsResult = await db.insert(exerciseSets).values(setInserts);

    if (!exerciseSetsResult) {
        return false;
    }

    return true;
}

const getWorkoutID = async (session, date) => {
    const workout = await db.select().from(workouts).where(and(eq(session.user.id, workouts.userId), eq(date, workouts.date)))
    if (workout.length > 0) {
        return workout[0].id;
    }
}
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
import { and, eq } from 'drizzle-orm';
import { nutritionLogs } from "@/db/schema";
export const GET = async (req, res) => {
    const session = await getServerSession(authOptions);
    const formatDate = (date) => {
        return new Intl.DateTimeFormat("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }).format(new Date(date));
    };

    if(!session) {
        return NextResponse.json({ error: "Unauthorized", found: false }, { status: 401 });
    }

    const nutritionData = await db.select().from(nutritionLogs).where(and(eq(nutritionLogs.userId, session.user.id), eq(nutritionLogs.date, formatDate(new Date())))).limit(1);
    if(nutritionData.length === 0) {
        const data = {
            userId: session.user.id,
            protein: 0,
            carbs: 0,
            fat: 0,
            calories: 0,
            date: formatDate(new Date()),
        }
        const result = await db.insert(nutritionLogs).values(data).execute();
        console.log(result);
        if (result) {
            return NextResponse.json({ message: "Nutrition Log created successfully", nutrition: nutritionLogs[0], success: true });
        } else {
            return NextResponse.json({ message: "Nutrition Log creation failed", success: false }, { status: 500 });
        }
    } 
    else {
        return NextResponse.json({ nutrition: nutritionData[0], found: true });
    }
}
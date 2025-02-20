import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
import { and, eq } from 'drizzle-orm';
import { nutritionLogs } from "@/db/schema";
import formatDate from "@/app/(tools)/formatdate";
export const GET = async (req, res) => {
    const session = await getServerSession(authOptions);
    
    if(!session) {
        return NextResponse.json({ error: "Unauthorized", found: false }, { status: 401 });
    }
    try {

        
        const {searchParams} = new URL(req.url);
        const date = searchParams.get("date") ?? formatDate(new Date());
        console.log(date)
        const nutritionData = await db.select().from(nutritionLogs).where(and(eq(nutritionLogs.userId, session.user.id), eq(nutritionLogs.date, date))).limit(1);
        if(nutritionData.length === 0) {
            const data = {
                userId: session.user.id,
                protein: 0,
                carbs: 0,
                fat: 0,
                calories: 0,
                date: date,
            }
            const result = await db.insert(nutritionLogs).values(data).execute();
            if (result) {
                return NextResponse.json({ message: "Nutrition Log created successfully", nutrition: nutritionLogs[0], success: true });
            } else {
                return NextResponse.json({ message: "Nutrition Log creation failed", success: false }, { status: 500 });
            }
        } 
        else {
            return NextResponse.json({ nutrition: nutritionData[0], found: true });
        }
    } catch(e) {
        console.log(e)
        return NextResponse.json({ message: "Nutrition Log creation failed", success: false }, { status: 500 });
    }
}


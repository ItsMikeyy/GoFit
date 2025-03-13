import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
import { and, eq, sum } from 'drizzle-orm';
import { meals, nutritionLogs } from "@/db/schema";
export const GET = async (req, res) => {
    const session = await getServerSession(authOptions);
    if(!session) {
        return NextResponse.json({ error: "Unauthorized", found: false }, { status: 401 });
    }
    try {

        
        const {searchParams} = new URL(req.url);
        const date = searchParams.get("date") 
        let nutritionData = await db.select().from(nutritionLogs).where(and(eq(nutritionLogs.userId, session.user.dbUser.id), eq(nutritionLogs.date, date))).limit(1);
        if(nutritionData.length === 0) {
            const data = {
                userId: session.user.dbUser.id,
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
            const mealData = await db.select(
                {
                    totalProtein: sum(meals.protein),
                    totalCarbs: sum(meals.carbs),
                    totalFat: sum(meals.fat),
                }
            ).from(meals).where(and(eq(meals.userId, session.user.dbUser.id), eq(meals.nutritionId, nutritionData[0].id)))
            nutritionData = await db.update(nutritionLogs)
            .set({
                protein: mealData[0].totalProtein || 0,
                carbs: mealData[0].totalCarbs || 0,
                fat: mealData[0].totalFat || 0,
                calories: (mealData[0].totalProtein * 4) + (mealData[0].totalCarbs * 4) + (mealData[0].totalFat * 9)
            }).where(eq(nutritionLogs.id, nutritionData[0].id))
            .returning();
            console.log(nutritionData)
            return NextResponse.json({ nutrition: nutritionData[0], found: true });
        }
    } catch(e) {
        console.log(e)
        return NextResponse.json({ message: "Nutrition Log creation failed", success: false }, { status: 500 });
    }
}


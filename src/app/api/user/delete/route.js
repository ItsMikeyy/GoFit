import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function DELETE(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({error: "Unauthorized", found: false}, { status: 401 });
    }
    try {
        const uid = session.user.dbUser.id;
        const res = await db.delete(users).where(eq(users.id, uid)).returning()

        if(!res) {
            return NextResponse.json({essage: "User not found"}, {status: 500});
        }
        return NextResponse.json({message: "User deleted"}, {status: 200});
        
    } catch(e) {
        console.log(e)
        return NextResponse.json({user: null, found: false, message: "Something went wrong"}, {status: 500});
    }
    
    
}
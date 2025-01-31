import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";


export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized", found: false }, { status: 401 });
    }
    const user = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1);
    if (user.length > 0) {
        return NextResponse.json({ user: user[0], found: true});
    }

    return NextResponse.json({ user: null, found: false });
}
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
export default async function Dashboard() {
    const session = await getServerSession();
    if (!session) {
        redirect("/api/auth/signin");
    }

    const user = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1);
    if (user[0]) {
        console.log(user)
        console.log("user found!");
    }
    else {
        console.log("No user found");
    }

    return (
        <div>
            <p>Welcome {session.user.name} </p>


        </div>
    )
}
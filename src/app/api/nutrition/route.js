import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
const GET = async (req, res) => {
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

    const nutrition = await db.select().from(nutrition).where(eq(nutrition.userId, session.user.id)).limit(1);

}
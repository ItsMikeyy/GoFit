import NextAuth from "next-auth/next";
import GoogleProvier from "next-auth/providers/google";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
export const authOptions = {
    providers: [
        GoogleProvier({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async redirect({url, baseUrl}) {
            return `${baseUrl}/dashboard`;
        },
        async jwt({token, user}) {
            if(user) {
                const dbuser = await db.select().from(users).where(eq(users.email, token.email)).limit(1);
                if(dbuser.length > 0) {
                    token.user = dbuser[0];
                    console.log(token, dbuser[0]);
                }
            }
            return token;
        },
        async session({session, token}) {
            session.user = token.user;
            return session;
        }
    },
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60

    },
    secret: process.env.NEXTAUTH_SECRET,
      
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}
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
    },
    secret: process.env.NEXTAUTH_SECRET,
      
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}
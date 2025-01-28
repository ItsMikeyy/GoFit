import NextAuth from "next-auth/next";
import GoogleProvier from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvier({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async redirect() {
          return "http://localhost:3000/dashboard";
        },
    secret: process.env.NEXTAUTH_SECRET
    }
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}
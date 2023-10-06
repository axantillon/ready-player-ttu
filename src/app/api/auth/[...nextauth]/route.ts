import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/lib/prisma"

const handler: AuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!!,
      clientSecret: process.env.GOOGLE_SECRET!!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
       try {
         await prisma.user.upsert({
           where: {
             email: user.email ? user.email : "",
           },
           update: {
             ...user,
             email: user.email ? user.email : "",
           },
           create: {
             ...user,
             email: user.email ? user.email : "",
           },
         });
       } catch (error) {
         console.log(error);
         return false;
       }
      
      return true;
    },
  },
});

export { handler as GET, handler as POST }
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler: AuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!!,
      clientSecret: process.env.GOOGLE_SECRET!!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      
      return true;
    },
  },
});

export { handler as GET, handler as POST }
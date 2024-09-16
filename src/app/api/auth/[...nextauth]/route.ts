import { api } from "@/lib/axios";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        const result = await api.post("/users", {
          name: user.name,
          email: user.email,
          avatarUrl: user.image,
        });

        if (result.status === 200 || result.status === 201) {
          console.log(result.data);
          return true;
        }

        return false;
      } catch (error) {
        console.log("Error: " + error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

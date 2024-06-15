import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/db/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      address: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    signIn: async ({ user, profile }) => {
      const u = {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        email_verified: profile?.email_verified,
      };
      return true;
    },
    session: async (props) => {
      props.session.user.userId = "ANgga";
      return props.session;
    },
  },
});

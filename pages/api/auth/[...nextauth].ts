// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import { NextApiHandler } from 'next';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '../../../lib/prisma';
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
      strategy: "jwt",
    },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }),
  ],

  secret: process.env.SECRET,

//   pages: {
//     signIn: "/",
//     signOut: "/",
//     error: "/",
//   },
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        // token.role = user.role;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);

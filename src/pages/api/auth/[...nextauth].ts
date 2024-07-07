import { AuthUser } from "@/types/AuthUser";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import api from "../../../../libs/api";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTATUH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials && credentials.email && credentials.password) {
          const user = await api.getUserByEmail(credentials.email);
          if (user) {
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user as AuthUser;
      }
      return session;
    },
  },
  pages: {
    // signIn: "/login",
  },
};

export default NextAuth(authOptions);

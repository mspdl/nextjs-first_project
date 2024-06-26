import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
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
      authorize: async (credentials, req) => {
        if (credentials?.email && credentials?.password) {
          const user = await api.getUserByEmail(credentials.email);
          if (user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            };
          }
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);

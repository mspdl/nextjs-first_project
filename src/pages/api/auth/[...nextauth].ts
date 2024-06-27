import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

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
        if (credentials?.email === "m@m.com") {
          const user = {
            id: 123,
            name: "Morgan",
            email: "m@m.com",
            role: "USER",
          };
          return user;
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);

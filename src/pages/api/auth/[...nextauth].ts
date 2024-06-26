import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTATUH_SECRET,
  providers: [],
};

export default NextAuth(authOptions);

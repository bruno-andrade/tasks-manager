import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import api from "@/services/api";
import { pick } from "lodash";

const sessionUserFields = ["id", "name", "email"] as const;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log(credentials)
          const response = await api.post("/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const user = response.data.data.user;
          const token = response.data.data.token;

          if (!user || !token) return null;

          return { ...user, token };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log({token, user})
        token = { ...token, ...pick(user, sessionUserFields), token: (user as any).token };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { ...pick(token, sessionUserFields) };
      session.token = token.token as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
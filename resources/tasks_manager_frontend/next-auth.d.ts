import NextAuth from "next-auth/next";

declare module 'next-auth' {
  interface Session {
    user: {
      email?: string | null;
      id?: string | null | unknown;
      name?: string | null | unknown;
      token?: string
    };
    token: string
  }
}
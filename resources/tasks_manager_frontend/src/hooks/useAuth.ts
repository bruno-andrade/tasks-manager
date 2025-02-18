import { signIn, signOut, useSession } from "next-auth/react";

export default function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user || null,
    token: session?.token || null,
    loading: status === "loading",
    login: async (email: string, password: string) => {
      const result = await signIn("credentials", { email, password, redirect: false });
      return result;
    },
    logout: () => signOut(),
  };
}
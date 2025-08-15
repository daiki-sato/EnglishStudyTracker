// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config"; // ← ここから読む

const { handlers } = NextAuth(authConfig);
export const { GET, POST } = handlers; // ← これだけ export

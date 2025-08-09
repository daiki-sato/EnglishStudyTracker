// lib/auth.ts
import NextAuth from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";

// NextAuthから必要な関数を生成してエクスポート
export const { auth, signIn, signOut } = NextAuth(authConfig);

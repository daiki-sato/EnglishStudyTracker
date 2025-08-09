import NextAuth from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";

// ここで auth / signIn / signOut を生成して公開
export const { auth, signIn, signOut } = NextAuth(authConfig);

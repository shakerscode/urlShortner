import { DefaultSession } from "next-auth";

// ✅ Extend the User type to include 'role'
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
  }
}

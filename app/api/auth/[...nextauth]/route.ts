import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

// ✅ Correctly export as API handlers
export { handler as GET, handler as POST };

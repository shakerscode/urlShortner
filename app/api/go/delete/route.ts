import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import db from "@/lib/db";

export async function DELETE(req: NextRequest) {
  // ✅ Get the user token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // ✅ Check if user is authenticated
  if (!token || !token.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  // ✅ Validate that the link belongs to the logged-in user
  const link = await db.shortLink.findUnique({ where: { id } });

  if (!link || link.createdBy !== token.id) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  // ✅ Delete the link
  await db.shortLink.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import db from "@/lib/db";

export async function PATCH(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, shortUrl, destination, title, tags } = await req.json();

  // ✅ Ensure the user is editing their own link
  const link = await db.shortLink.findUnique({ where: { id } });

  if (!link || link.createdBy !== token.id) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  // ✅ Update the link
  const updatedLink = await db.shortLink.update({
    where: { id },
    data: { shortUrl, destination, title, tags },
  });

  return NextResponse.json({ success: true, updatedLink });
}

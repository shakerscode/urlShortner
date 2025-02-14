import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { id, shortUrl, destination, title, tags } = await req.json();

    if (!id || !shortUrl || !destination) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // ✅ Update the database
    await db.shortLink.update({
      where: { id },
      data: {
        shortUrl,
        destination,
        title,
        tags,
      },
    });

    return NextResponse.json({ message: "Link updated successfully!" });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

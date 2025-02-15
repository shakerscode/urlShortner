import db from "@/lib/db";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

// Get: Fetch all short links
export async function GET() {
  try {
    const links = await db.shortLink.findMany();
    return NextResponse.json(links);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error)?.message || "Failed to find links" },
      { status: 500 }
    );
  }
}

// ✅ POST: Create a new short link with a random ID
export async function POST(req: Request) {
  try {
    const { destination, createdBy, title, shortUrl } = await req.json();

    // ✅ Ensure required fields are provided
    if (!destination || !createdBy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure shortUrl is unique (if user provides one)
    if (shortUrl) {
      const existingLink = await db.shortLink.findUnique({
        where: { shortUrl },
      });

      if (existingLink) {
        return NextResponse.json(
          { error: "This short link is already taken. Try another." },
          { status: 400 }
        );
      }
    }

    // ✅ Generate a random short URL (6-character string)
    const shortCode = shortUrl || nanoid(6);

    // ✅ Create the short link in MongoDB using Prisma

    const newLink = await db.shortLink.create({
      data: {
        shortUrl: shortCode,
        destination,
        createdBy,
        locked: false,
        createdAt: new Date(),
        title,
      },
    });

    // ✅ Return the generated short URL
    return NextResponse.json({ newLink });
  } catch (error) {
    console.error("Error creating short link:", error);
    return NextResponse.json(
      { error: "Failed to create short link" },
      { status: 500 }
    );
  }
}

import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    await db.shortLink.delete({ where: { id } });

    return NextResponse.json({ message: "Link deleted successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

import { redirect } from "next/navigation";
import db from "@/lib/db";

export default async function RedirectPage({
  params,
}: {
  params: { shortUrl: string };
}) {
  // Find the original URL in the database
  const link = await db.shortLink.findUnique({
    where: { shortUrl: params.shortUrl },
  });

  // If no short link found, show a 404 page
  if (!link) {
    redirect("www.google.com");
    return;
  }

  // Redirect to the destination URL
  redirect(link.destination);
}

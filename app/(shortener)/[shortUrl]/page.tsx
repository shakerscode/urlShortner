import { redirect } from "next/navigation";
import db from "@/lib/db";

type tParams = Promise<{ shortUrl: string }>;

// ✅ Correctly type the props
export default async function RedirectPage({ params }: { params: tParams }) {
  // Get the short URL from params
  const { shortUrl } = await params;

  // Find the original URL in the database
  const link = await db.shortLink.findUnique({
    where: { shortUrl },
  });

  // If no short link found, show a 404 page
  if (!link) {
    return (
      <h1 className="text-center text-xl font-bold text-red-500 mt-10">
        404 - Short link not found
      </h1>
    );
  }

  // Redirect to the destination URL
  redirect(link.destination);
}

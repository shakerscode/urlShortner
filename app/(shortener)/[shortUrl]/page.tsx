// import { notFound, redirect } from "next/navigation";
// import db from "@/lib/db";

// interface PageProps {
//   params: { shortUrl: string };
// }

// export default async function ShortUrlRedirectPage({ params }: PageProps) {
//   if (!params || !params.shortUrl) {
//     return notFound();
//   }
//   const { shortUrl } = await params; // ✅ Ensure correct type

//   // ✅ Exclude reserved routes
//   const RESERVED_ROUTES = ["auth", "dashboard", "api"];
//   if (RESERVED_ROUTES.includes(shortUrl)) {
//     return notFound();
//   }

//   // ✅ Fetch the destination URL from the database
//   const link = await db.shortLink.findUnique({
//     where: { shortUrl },
//   });

//   if (!link) {
//     return notFound(); // Show 404 if short link is not found
//   }

//   redirect(link.destination);
// }

import { notFound, redirect } from "next/navigation";
import db from "@/lib/db";

type tParams = Promise<{ shortUrl: string }>;

// ✅ Correctly type the props
export default async function RedirectPage({ params }: { params: tParams }) {
  // Get the short URL from params
  const { shortUrl } = await params;
  // ✅ Exclude reserved routes
  const RESERVED_ROUTES = ["auth", "dashboard", "api"];
  if (RESERVED_ROUTES.includes(shortUrl)) {
    return notFound();
  }

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

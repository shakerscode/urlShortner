import { notFound } from "next/navigation";
import db from "@/lib/db";
import Link from "next/link";
import { Pencil, Calendar, Tag } from "lucide-react";
import { headers } from "next/headers";
import CopyBtn from "@/components/copy";

export default async function LinkDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const link = await db.shortLink.findUnique({
    where: { id: params.id },
  });

  if (!link) return notFound();

  return (
    <div>
      {/* Back Button */}
      <Link
        href="/dashboard/links"
        className="text-blue-500 hover:underline text-sm flex items-center ml-10 mt-10"
      >
        ← Back to list
      </Link>
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow mt-6">
        {/* Link Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">
            {link.title || "No Title"}
          </h2>
          <div className="flex items-center gap-1">
            <CopyBtn url={link.shortUrl} />
            <Link href={`/dashboard/links/${link.id}/edit`}>
              <button className="p-2 rounded bg-gray-200 hover:bg-gray-300">
                <Pencil size={14} />
              </button>
            </Link>
          </div>
        </div>

        {/* Shortened URL */}
        <div className="mt-2 flex justify-between items-center gap-2">
          <a
            href={`${baseUrl}/${link.shortUrl}`}
            target="_blank"
            className="text-blue-500 hover:underline text-lg"
          >
            {baseUrl}/{link.shortUrl}
          </a>
        </div>

        {/* Destination URL */}
        <p className="text-sm text-gray-500 mt-2 break-all">
          {link.destination}
        </p>

        {/* Metadata */}
        <div className="mt-4 flex items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            {new Date(link.createdAt).toLocaleString("en-US", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </div>
          <div className="flex items-center gap-1">
            <Tag size={16} />
            {link.tags ? link.tags.split(",").join(", ") : "No tags"}
          </div>
        </div>
      </div>
    </div>
  );
}

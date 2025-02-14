import db from "@/lib/db";
import { Pencil, Trash } from "lucide-react";
import CopyBtn from "./copy";
import { headers } from "next/headers";
import Link from "next/link";
import { shortenLink } from "@/utils/utils";

export default async function LinksPage() {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const links = await db.shortLink.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800">Go Links</h2>

      {/* Search and Filter Section */}
      <div className="flex justify-between mt-4">
        <input
          type="text"
          placeholder="Search links..."
          className="border px-4 py-2 rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-blue bg-white"
        />
        <div className="flex gap-4">
          <button className="border px-4 py-2 rounded-lg bg-white">
            Filter by date
          </button>
          <button className="border px-4 py-2 rounded-lg bg-white">
            Add filters
          </button>
        </div>
      </div>

      {/* Links List */}
      <div className="mt-6 border-t pt-4 flex flex-col gap-3">
        {links.map((link, index) => (
          <div
            key={index}
            className="border p-5 rounded-xl min-h-[100px] flex justify-between items-start bg-white"
          >
            <div className="rounded-lg flex flex-col bg-white w-full">
              <Link href={`/dashboard/links/${link?.id}`}>
                <h3 className="text-lg font-semibold">
                  {link?.title || "No title"}
                </h3>
              </Link>
              <a
                href={`${baseUrl}/${link.shortUrl}`}
                className="text-blue-500 hover:underline w-fit"
                target="_blank"
              >
                {`${baseUrl}/${link.shortUrl}`}
              </a>
              <p className="text-sm text-gray-500 w-full break-all whitespace-normal overflow-hidden">
                {shortenLink(link.destination, 100)}
              </p>
            </div>

            <div className="flex gap-1">
              <CopyBtn url={link.shortUrl} />
              {/* <button className="p-2 rounded bg-gray-200 hover:bg-gray-300">
                <SquareArrowOutUpRight size={14} />
              </button> */}
              <Link href={`/dashboard/links/${link.id}/edit`}>
                <button className="p-2 rounded bg-gray-200 hover:bg-gray-300">
                  <Pencil size={14} />
                </button>
              </Link>
              <button className="p-2 rounded bg-red-500 text-white hover:bg-red-600">
                <Trash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

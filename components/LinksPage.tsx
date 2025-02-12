import db from "@/lib/db";
import { Pencil, Trash, SquareArrowOutUpRight } from "lucide-react";
import CopyBtn from "./copy";
import { headers } from "next/headers";

export default async function LinksPage() {
  const host = (await headers()).get("host"); // Get the current host dynamically
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const links = await db.shortLink.findMany({
    orderBy: { createdAt: "desc" }, // Sort by newest first
  });

  return (
    <div className=" rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800">Go Links</h2>

      {/* Search and Filter Section */}
      <div className="flex justify-between mt-4">
        <input
          type="text"
          placeholder="Search links..."
          className="border px-4 py-2 rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-blue"
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
            className="border p-4 rounded-lg flex justify-between items-center bg-white"
          >
            <div>
              <h3 className="text-lg font-semibold">{"No title"}</h3>
              <a
                href={`${baseUrl}/${link.shortUrl}`}
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                {`${baseUrl}/${link.shortUrl}`}
              </a>
              <p className="text-sm text-gray-500">{link.destination}</p>
            </div>
            <div className="flex gap-3">
              <CopyBtn url={link.shortUrl} />
              <button className="p-2 rounded bg-gray-200 hover:bg-gray-300">
                <SquareArrowOutUpRight size={18} />
              </button>
              <button className="p-2 rounded bg-gray-200 hover:bg-gray-300">
                <Pencil size={18} />
              </button>
              <button className="p-2 rounded bg-red-500 text-white hover:bg-red-600">
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

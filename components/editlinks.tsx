import db from "@/lib/db";
import { ILinks } from "@/types/links";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface IComponentProps {
  baseUrl: string;
  link: ILinks;
  id: string;
}
function EditLink({ baseUrl, link, id }: IComponentProps) {
  async function updateLink(formData: FormData) {
    "use server"; // ✅ Server action for form submission

    const updatedShortUrl = formData.get("shortUrl") as string;
    const updatedDestination = formData.get("destination") as string;
    const updatedTitle = formData.get("title") as string;
    const updatedTags = formData.get("tags") as string;

    await db.shortLink.update({
      where: { id },
      data: {
        shortUrl: updatedShortUrl,
        destination: updatedDestination,
        ...(updatedTitle && { title: updatedTitle }),
        ...(updatedTags && { tags: updatedTags }),
      },
    });

    redirect("/dashboard/links");
  }

  return (
    <form action={updateLink} className="space-y-4">
      {/* Short Link Input */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold">
          Short link
        </label>
        <div className="flex items-center border rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue">
          <span className="text-gray-500">{baseUrl}/</span>
          <input
            type="text"
            name="shortUrl"
            defaultValue={link.shortUrl}
            required
            className="flex-1 outline-none bg-transparent px-2"
          />
        </div>
      </div>

      {/* Destination URL Input */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold">
          Destination URL
        </label>
        <input
          type="url"
          name="destination"
          defaultValue={link.destination}
          required
          className="w-full border px-3 py-2 rounded-lg mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue"
        />
      </div>

      {/* Title Input */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold">
          Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={link?.title || ""}
          className="w-full border px-3 py-2 rounded-lg mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue"
        />
      </div>

      {/* Tags Input */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold">
          Tags
        </label>
        <input
          type="text"
          name="tags"
          defaultValue={link?.tags || ""}
          className="w-full border px-3 py-2 rounded-lg mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue"
          placeholder="Separate tags with commas"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Link href="/dashboard/links" className="text-gray-500 hover:underline">
          Cancel
        </Link>
        <button
          type="submit"
          className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default EditLink;

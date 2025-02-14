"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

interface IComponentProps {
  baseUrl: string;
  link: {
    id: string;
    shortUrl: string;
    destination: string;
    title?: string;
    tags?: string;
  };
}

function EditLink({ baseUrl, link }: IComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const [shortUrl, setShortUrl] = useState(link.shortUrl);
  const [destination, setDestination] = useState(link.destination);
  const [title, setTitle] = useState(link.title || "");
  const [tags, setTags] = useState(link.tags || "");

  const router = useRouter();

  // ✅ Check if any field has changed
  useEffect(() => {
    const hasChanged =
      shortUrl !== link.shortUrl ||
      destination !== link.destination ||
      title !== (link.title || "") ||
      tags !== (link.tags || "");

    setIsChanged(hasChanged);
  }, [shortUrl, destination, title, tags, link]);

  // ✅ Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/go/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: link.id,
          shortUrl,
          destination,
          title,
          tags,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update link.");
      }

      toast.success("Link updated successfully!");
      router.push("/dashboard/links"); // Redirect after success
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Something went wrong.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Short Link Input */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold">
          Short link
        </label>
        <div className="flex items-center gap-2 mt-2">
          <input
            className="text-gray-500 px-3 py-2 border rounded-lg"
            value={`${baseUrl}/`}
            disabled
          />
          <input
            type="text"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            required
            className="flex-1 outline-none bg-transparent border rounded-lg px-2 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue"
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
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title(optional)"
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
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue"
          placeholder="Separate tags with commas"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-4">
        <Link href="/dashboard/links" className="text-gray-500 hover:underline">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={!isChanged || isLoading} // ✅ Disable when no changes
          className={`px-4 py-2 rounded-lg ${
            isChanged
              ? "bg-blue text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}

export default EditLink;
